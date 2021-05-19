import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { IGrocery } from '../../helpers/types/IGrocery';



export interface Item {
  label: string;
  value: string;
}
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" }
];


interface Props {
  onChange: (selected?: Item[]) => void,
  groceries: IGrocery[]
}

export const AutoCompleteInput : React.FC<Props> = ({onChange, groceries}) => {

    const [pickerItems, setPickerItems] = React.useState(countries);
    const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  
    console.log('list grocery => ', groceries);
    React.useEffect(() => {
      let pi = groceries.map((g) => {
        return {
          label: g.title,
          value: g.id.toString()   
        }
      });
      setPickerItems(pi);
    });
    
  
    return (
          <CUIAutoComplete
            label=""
            placeholder="Search in grocery"
            onCreateItem={(item) => {
              onChange([item])
            }}
            items={pickerItems}
            selectedItems={[]}
            onSelectedItemsChange={(changes) =>
              //handleSelectedItemsChange(changes.selectedItems)
              onChange(changes.selectedItems)
            }
            inputStyleProps={{variant:'filled'}}
          />
    );
}