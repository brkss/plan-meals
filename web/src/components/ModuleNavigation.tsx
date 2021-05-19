import React from 'react';
import { Box } from '@chakra-ui/react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router';

interface Props {
    links: {
        name: string,
        link: string,
    }[]
}

export const ModuleNavigation : React.FC<Props> = ({links}) => {
    const history = useHistory();
    const [path, SetPath] = React.useState(links[0].link);
    React.useEffect(() => {
        history.listen((res) => {
            SetPath(res.pathname);
            console.log('location => ', links);
        })
        
    }, []);

    return (
        <Box w='full' >
            <UnorderedList>
                {
                    links.map((link, key) => (
                        <ListItem key={key} className={link.link === path ? 'active-nav' : ''}>
                            <Link to={link.link}>{link.name}</Link>
                        </ListItem>
                    ))
                }
                
            </UnorderedList>
        </Box>
    );

}


const UnorderedList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    display: inline-block;
    margin: 0 5px;
    background: #dcdcdc;
    padding: 6px 10px;
    border-radius: 6px;
    font-weight: bold;
    &.linkd
`