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
  const [erro, setErro] = useState<boolean>(false)

  const buscarGatos = async () => {
    try{
      setErro(false)
      const { data } = await axios.get("http://localhost:3000/api/gatos")
      setListaDeGatos(data)
    }
    catch(e){
      setErro(true)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.botao} onPress={() => buscarGatos()}>
        <Text style={styles.textoBotao}>Buscar Gatos</Text>
      </Pressable>
      {
        erro ?
          <Text>Erro</Text>
        :
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
      }
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
