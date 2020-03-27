import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const navigation = useNavigation();
  const [incident, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incident.length === total) {
      return;
    }

    setLoading(true);

    api.get('incidents', {
      params: { page }  //passando a nova página que deverá ser feita a request.
    })
      .then(response => {
        setIncidents([...incident, ...response.data]);  //ao invés de a cada request sobrescrever o valor de 'Incident', ele anexa os novos valores
        setTotal(response.headers['x-total-count']);    //junto com os valores antigos.
        setPage(page + 1)
        setLoading(false);
      })
      .catch(() => {
        alert('Não foi possível carregar os incidentes, tente novamente.')
      })
  }

  useEffect(() => {
    loadIncidents();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incident}
        style={styles.incidentList}
        keyExtractor={incident => incident.id.toString()} //Passando um ID único para cada elemento da lista renderizado.
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
            </Text>

            <TouchableOpacity onPress={() => navigateToDetail(incident)} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color='#e02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}