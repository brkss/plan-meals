import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'



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
  onChange: (selected?: Item[]) => void 
}

export const AutoCompleteInput : React.FC<Props> = ({onChange}) => {

    const [pickerItems, setPickerItems] = React.useState(countries);
    const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  
    const handleCreateItem = (item: Item) => {
      setPickerItems((curr) => [...curr, item]);
      setSelectedItems((curr) => [...curr, item]);
    };
  
    const handleSelectedItemsChange = (selectedItems?: any) => {
        console.log('selected items => ', selectedItems)
      if (selectedItems) {
        setSelectedItems(selectedItems);
      }
    };
  
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