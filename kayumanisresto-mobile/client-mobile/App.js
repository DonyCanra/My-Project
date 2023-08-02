import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}
