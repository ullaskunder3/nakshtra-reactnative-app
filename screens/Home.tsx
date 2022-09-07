import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableHighlight } from 'react-native';
import getAstroidInfo from '../api/fetchData';
import getRandomAstroidInfo from '../api/RandomAstroidInfo';
import { tostMessage } from '../api/toastMessage';
import HomeProp from '../interface/Home';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function Home(props: HomeProp) {
  const [astroidId, setAstroidId] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const changeHandler = (id:any) => {
    if (!isNaN(id)) { 
      setAstroidId(id)
    }else {
      setAstroidId('')
      tostMessage('Invalid Input: Only Strings')
    }
  }

  const submitHandler = ()=>{    
    if (astroidId.length > 0) {
      setIsLoading(true)
      getAstroidInfo(astroidId)
      .then(response => {
            if (response !== '404') {
              setIsLoading(false)
              props.navigation.navigate('AsteroidInfo', {
                asteroidInfo: {
                  "name": response.name,
                  "nasa_jpl_url": response.nasa_jpl_url,
                  "is_potentially_hazardous_asteroid": response.is_potentially_hazardous_asteroid,
                }
              })
              setAstroidId('')
            } else {
              tostMessage('incorrect country name')
              setAstroidId('');
            }
            setAstroidId('');
          }).catch(() => {
            tostMessage('incorrect country name')
            setAstroidId('');
          })
    }else {
      setAstroidId('')
      tostMessage('Invalid Input: Please valid ID')
    }
  }

  /**
   * RandomHandler firsting getting the ID from response data
   * get the random ID from arry of ID 
   * pass that to getAstroidInfo
   */
  const RandomHandler = () => {
    setIsLoading(true)
      getRandomAstroidInfo()
        .then(response => {
          // @ts-ignore
          const arrayOfID = response["near_earth_objects"];

          // @ts-ignore
          const allAsteroidID =  arrayOfID.map(obj=>obj.id)
          const randomIdx = Math.floor(Math.random()*allAsteroidID.length)
          const RANDOM_ASTROID_ID = allAsteroidID[randomIdx];

          return RANDOM_ASTROID_ID
        })
        .then((randomID)=>{          
          getAstroidInfo(randomID)
          .then(response => {
            if (response !== '404') {
              setIsLoading(false)
              props.navigation.navigate('AsteroidInfo', {
                asteroidInfo: {
                  "name": response.name,
                  "nasa_jpl_url": response.nasa_jpl_url,
                  "is_potentially_hazardous_asteroid": response.is_potentially_hazardous_asteroid,
                }
              })
            } else {
              tostMessage('incorrect country name')
              setAstroidId('');
            }
            setAstroidId('');
          }).catch(() => {
            tostMessage('incorrect country name')
            setAstroidId('');
          })
        })
        .catch(() => {
          tostMessage('incorrect country name')
          setAstroidId('');
        })
  }

  return (
    <View style={styles.main}>
      <Spinner
       visible={isloading}
       />
      <TextInput
        placeholder='Enter Asteroid ID'
        placeholderTextColor='#9e9e9e'
        style={styles.searchInput}
        onChangeText={changeHandler}
        value={astroidId}
        keyboardType='numeric'
      />
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={submitHandler}
      >
        <Text
          style={styles.buttonText}>
          Submit
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={RandomHandler}
      >
        <Text
          style={styles.buttonText}>
          Random Asteroid
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#474747',
    alignSelf: 'center',
    fontWeight: '800'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
