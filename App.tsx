import { useState } from 'react';
import {
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

interface ImagemGato{
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function App() {
  const [listaDeGatos, setListaDeGatos] = useState<ImagemGato[]>([])

  return (
    <View style={styles.container}>
      <Pressable style={styles.botao}>
        <Text style={styles.textoBotao}>Buscar Gatos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: '80%',
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 8,
    marginVertical: 20
  },
  textoBotao: {
    fontSize: 16,
    textAlign: 'center'
  }
});
