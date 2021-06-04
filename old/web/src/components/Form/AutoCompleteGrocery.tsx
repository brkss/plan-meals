import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { IGrocery } from '../../helpers/types/IGrocery';
import axios from '../../config/axios';
import { URLS } from '../../helpers/Constants';


export interface Item {
  label: string;
  value: string;
}

interface Props {
  onChange: (selected?: Item[]) => void,
  groceries: IGrocery[]
}

export const AutoCompleteInput : React.FC<Props> = ({onChange, groceries}) => {

    const [pickerItems, setPickerItems] = React.useState<Item[]>([]);
  

    React.useEffect(() => {
      let pi = groceries?.map((g) => {
        return {
          label: g.title,
          value: g.id.toString()   
        }
      });
      setPickerItems(pi);
    }, []);

    if(pickerItems.length === 0){
      return <>loading</>
    }

    const handleItemCreation = async (item: Item) => {
      console.log('create this item => ', item);
      const _data = {
          title: item.label,
          price: 0,
          available: false,
          category_id: 9
      }
      console.log('_data => ', _data);

      const resp = await axios.post(URLS.grocery.create, _data); 
      const data = resp.data;
      if(!data || !data.item) return;
      onChange([{label: data.item.title, value: data.item.id.toString()}]);
    }
    
  
    return (
          <CUIAutoComplete
            label=""
            placeholder="Search .."
            onCreateItem={async (item) => {
              await handleItemCreation(item);
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