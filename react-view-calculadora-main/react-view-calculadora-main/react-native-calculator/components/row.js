import {View, StyleSheet} from "react-native";
const Row = ({children}) => {
return (
<View style={styles.container}>
{children}
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
flexDirection: "row",
},
});
export default Row;