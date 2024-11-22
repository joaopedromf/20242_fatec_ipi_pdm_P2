import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

const imagemFundo = require('./assets/imagem_fundo.png')

interface ImagemGato{
  id: string;
  url: string;
}

export default function App() {
  const [listaDeGatos, setListaDeGatos] = useState<ImagemGato[]>([])
  const [carregando, setCarregando] = useState<boolean>(false)
  const [erro, setErro] = useState<boolean>(false)

  const buscarGatos = async () => {
    try{
      setErro(false)
      setCarregando(true)
      const { data } = await axios.get("http://localhost:3000/api/gatos")
      setCarregando(false)
      setListaDeGatos(data)
    }
    catch(e){
      setCarregando(false)
      setErro(true)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={imagemFundo} style={styles.imagemFundo}>
        <Text style={styles.titulo}>Buscador de Gatos <Ionicons name="logo-octocat" size={35} style={styles.iconeGato}></Ionicons></Text>
        <Pressable style={styles.botao} onPress={() => buscarGatos()}>
          <Text style={styles.textoBotao}>Buscar</Text>
        </Pressable>
        {
          carregando && !erro ? 
            <ActivityIndicator size='large' color='black' />
          :
            erro ?
              <View style={styles.containerErro}>
                <Ionicons name="close-circle-outline" size={40} color='darkred'></Ionicons>
                <Text style={styles.textoErro}>Erro ao buscar as imagens.</Text>
              </View>
            :
              listaDeGatos.length > 0 ?
                <FlatList
                  data={listaDeGatos}
                  renderItem={({item}) => (
                    <View style={styles.itemLista}>
                      <Image 
                        source={{uri: item.url}}
                        resizeMode='cover'
                        style={styles.imagemItem}
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  style={styles.lista}
                />
              :
              ""
        }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imagemFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  titulo: {
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8
  },
  iconeGato: {
    verticalAlign: 'bottom',
    marginLeft: 10
  },
  botao: {
    width: '80%',
    backgroundColor: 'blanchedalmond',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1
  },
  textoBotao: {
    fontSize: 16,
    textAlign: 'center'
  },
  lista: {
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 20
  },
  itemLista: {
    marginVertical: 10,
    alignItems: 'center'
  },
  imagemItem: {
    width: 400,
    height: 400
  },
  containerErro: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'darkred',
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 8,
    alignItems: 'center'
  },
  textoErro: {
    fontSize: 20,
    fontWeight: 600,
    color: 'darkred'
  }
});
