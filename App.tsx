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
  const [listaDeGatos, setListaDeGatos] = useState<ImagemGato[]>([
    {
      "id": "g6SI_ZZRh",
      "url": "https://cdn2.thecatapi.com/images/g6SI_ZZRh.jpg"
    },
    {
      "id": "19l",
      "url": "https://cdn2.thecatapi.com/images/19l.gif"
    },
    {
      "id": "d59",
      "url": "https://cdn2.thecatapi.com/images/d59.jpg"
    },
    {
      "id": "4bd",
      "url": "https://cdn2.thecatapi.com/images/4bd.gif"
    }
  ])

  return (
    <View style={styles.container}>
      <Pressable style={styles.botao}>
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
