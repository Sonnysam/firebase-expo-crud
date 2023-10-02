import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { db } from "../config/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function Crud() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [userInfo, setUserInfo] = useState<any | undefined>(null);


  const handleCreate = async () => {
    try {
      await setDoc(doc(db, "employees", "userID"), {
        Username: name,
        Email: email,
        Age: age
      });
    } catch (error: any) {
      console.log("Error creating document: ", error);
    }
  }

  const handleRead = async () => {
    try {
      const docRef = doc(db, "employees", "userID");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data());
      } else {
        console.log("No such document!");
      }

    } catch (error: any) {
      console.log("Error reading document: ", error);

    }
  }

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "employees", "userID");
      await updateDoc(docRef, {
        Username: name,
        Email: email,
        Age: age
      });
    } catch (error: any) {
      console.log("Error updating document: ", error);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "employees", "userID"));
    } catch (error: any) {
      console.log("Error deleting document: ", error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: "white", fontSize: 20 }}>
          Firebase Crud Tutorial
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Age"
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => setAge(Number(text))}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.delete} onPress={handleDelete}>
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.update} onPress={handleUpdate}>
            <Text style={{ color: "white" }}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.create} onPress={handleCreate}>
            <Text style={{ color: "white" }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.read} onPress={handleRead}>
            <Text>Read</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <Text style={{ color: "white", fontSize: 20 }}>{userInfo?.Username}</Text>
        <Text style={{ color: "white", fontSize: 20 }}>{userInfo?.Email}</Text>
        <Text style={{ color: "white", fontSize: 20 }}>{userInfo?.Age}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162430",
  },
  content: {
    flex: 1,
    marginTop: 55,
    marginHorizontal: 15,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dataContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  // buttons
  delete: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  update: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  create: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  read: {
    backgroundColor: "yellow",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
