// react
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// styling
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';
// types
import { DirectoryCategory } from '../directory/directory.component';

type DirectoryItemsProps = {
    category: DirectoryCategory
}

const DirectoryItem: FC<DirectoryItemsProps> = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const navigateHandler = useCallback(() => {
        navigate(route)
    }, []);

    return (
        <DirectoryItemContainer onClick={navigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem