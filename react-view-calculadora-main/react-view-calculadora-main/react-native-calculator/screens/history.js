import {StyleSheet, Text, View, FlatList} from 'react-native';
import Button from '../components/button';
import Row from '../components/row';
const History = ({history, cancelHistoryWindow}) => {
const renderItem = ({item}) => (
<View style={styles.item}>
<Text style={styles.text}>{item.text}</Text>
</View>
);
return (
<View style={styles.container}>
<View style={styles.blockMenu}>
<Row>
<Button text="Back" theme="menu" onPress={() => cancelHistoryWindow()} />
</Row>
</View>
<View style={styles.blockHistory}>
<FlatList data={history} renderItem={renderItem} keyExtractor={(item) =>
item.id} />
</View>
</View>
);
};
const styles = StyleSheet.create({
container: {
backgroundColor: 'black',
flex: 1,
},
blockMenu: {
flex: 0.75,
},
blockHistory: {
flex: 9.25,
justifyContent: 'flex-end',
padding: 10,
},
item: {
backgroundColor: 'gray',
padding: 5,
margin: 5,
},
text: {
fontSize: 20,
},
});
export default History;