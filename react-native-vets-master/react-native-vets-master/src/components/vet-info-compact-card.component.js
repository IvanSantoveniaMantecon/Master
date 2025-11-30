import { Text } from "../theme/Typography";
import { CompactWebview, Item } from "../theme/Styles";
export const VetInfoCompactComponent = ({ vet }) => {
    return (
    <Item>
    <CompactWebview source={{ uri: vet.photo }} />
    <Text center variant="caption" numberOfLines={3}>
    {vet.name}
    </Text>
    </Item>
    );
    };