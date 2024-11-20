import axios from 'axios';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

interface ImagemGato{
  id: string;
  url: string;
}

export default function App() {
  const [listaDeGatos, setListaDeGatos] = useState<ImagemGato[]>([])

  const buscarGatos = async () => {
    const { data } = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10")
    const novaListaDeGatos: ImagemGato[] = [...data].splice(5, 5).map(gato => {
      return { 
        id: gato.id, 
        url: gato.url 
      }
    })
    setListaDeGatos(novaListaDeGatos)
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.botao} onPress={() => buscarGatos()}>
        <Text style={styles.textoBotao}>Buscar Gatos</Text>
      </Pressable>
      <FlatList
        data={listaDeGatos}
        renderItem={({item}) => (
          <View style={styles.itemLista}>
            <Image 
              source={{uri: item.url}}
              resizeMode='center'
              style={styles.imagemItem}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.lista}
      />
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
  },
  lista: {
    width: '80%',
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20
  },
  itemLista: {
    marginVertical: 10,
    alignItems: 'center'
  },
  imagemItem: {
    width: '70%',
    height: 300
  }
});
