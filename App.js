import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";
import Home from "./Home";
import Setting from "./Setting";
import SignUp from "./SignUp";
import Branch from "./Branch";
import Transaction from "./Transaction";
import Calendar from "./Calendar";
import Post from "./Post";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Setting" component={Setting}/>
                <Stack.Screen name="Transaction" component={Transaction}/>
                <Stack.Screen name="Branch" component={Branch}/>
                <Stack.Screen name="Post" component={Post}/>
                <Stack.Screen name="Calendar" component={Calendar}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};