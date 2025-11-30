import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';

const Button = ({text, theme,onPress}) => {
const buttonStyles = [styles.button];
const textStyles = [styles.text];
if (theme === "secondary") {
buttonStyles.push(styles.buttonSecondary);
textStyles.push(styles.textSecondary);
} else if (theme === "operation") {
buttonStyles.push(styles.buttonOperation);
} else if (theme === "calculation") {
buttonStyles.push(styles.buttonCalculation);
} else if (theme === "removal") {
buttonStyles.push(styles.buttonRemoval);
textStyles.push(styles.textRemoval);
} else if (theme === "menu") {
buttonStyles.push(styles.buttonMenu);
}
switch (text) {
case "delete":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<Feather name="delete" size={30} />
</TouchableOpacity>
);
case "division":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<MaterialCommunityIcons name="division" size={30} color="white" />
</TouchableOpacity>
);
case "math-log":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<MaterialCommunityIcons name="math-log" size={30} />
</TouchableOpacity>
);
case "math-sin":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<MaterialCommunityIcons name="math-sin" size={30} />
</TouchableOpacity>
);
case "percent":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<MaterialCommunityIcons name="percent" size={30} />
</TouchableOpacity>
);
case "square-root":
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<MaterialCommunityIcons name="square-root" size={30} />
</TouchableOpacity>
);
default:
return (
<TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={0.5}>
<Text style={textStyles}>{text}</Text>
</TouchableOpacity>
);
}

return (
<TouchableOpacity style={buttonStyles} activeOpacity={0.5} onPress={onPress}>
<Text style={textStyles}>{text}</Text>
</TouchableOpacity>
);
};
const styles = StyleSheet.create({
button: {
flex: 1,
backgroundColor: "#333333",
alignItems: "center",
justifyContent: "center",
borderRadius: 25,
margin: 5,
},
text: {
color: "#fff",
fontSize: 24,

},
textRemoval: {
color: "#000",
},
textSecondary: {
color: "#060606",
},
buttonCalculation: {
backgroundColor: "#29b6e6",
},
buttonMenu: {
flex: 0.3,
backgroundColor: "#999999",
},
buttonOperation: {
backgroundColor: "#ffc107",
},
buttonRemoval: {
backgroundColor: "#ef5350",
},
buttonSecondary: {
backgroundColor: "#a6a6a6",
}

});
export default Button;