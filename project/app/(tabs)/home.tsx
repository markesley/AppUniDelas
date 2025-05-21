// app/(tabs)/home.tsx
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native'
import { Bell, AlertTriangle, HeartHandshake, Calendar } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_BASE_URL } from '../config/config'

export default function HomeScreen() {
  const router = useRouter()
  const [alertCount, setAlertCount] = useState(0)

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/alertas-emergencia/recebidos`,
          { credentials: 'include' }
        )
        if (!res.ok) throw new Error('Erro na busca')
        const data = await res.json()
        setAlertCount(Array.isArray(data) ? data.length : 0)
      } catch (err: any) {
        console.error(err)
      }
    }
    fetchAlerts()
  }, [])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      router.replace('/login')
    } catch {
      Alert.alert('Erro', 'Não foi possível deslogar')
    }
  }

  const openLink = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o link')
      }
    })
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>UniDelas</Text>
        <Text style={styles.subtitle}>Um espaço seguro para todas nós</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* BANNER DE EMERGÊNCIAS (AMARELO) */}
      <View style={styles.alertBanner}>
        <Bell size={20} color="#000" />
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => router.push('/alertas-recebidos')}
        >
          <Text style={styles.alertText}>
            Você tem {alertCount} alerta(s)
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO DE PERIGO CENTRALIZADO */}
      <View style={styles.panicContainer}>
        <TouchableOpacity
          style={styles.panicButton}
          onPress={() => router.push('/panic')}
        >
          <AlertTriangle size={28} color="#FFF" />
          <Text style={styles.panicText}>Botão de Perigo</Text>
        </TouchableOpacity>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/support')}
        >
          <HeartHandshake size={24} color="#FFF" />
          <Text style={styles.buttonText}>Encontrar Apoio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/groups')}
        >
          <Calendar size={24} color="#FFF" />
          <Text style={styles.buttonText}>Eventos e Grupos</Text>
        </TouchableOpacity>
      </View>

      {/* NÚMEROS IMPORTANTES */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Números Importantes</Text>
        <View style={styles.helpCard}>
          <Text style={styles.helpNumber}>180</Text>
          <Text style={styles.helpText}>Central de Atendimento à Mulher</Text>
        </View>
        <View style={styles.helpCard}>
          <Text style={styles.helpNumber}>190</Text>
          <Text style={styles.helpText}>Polícia Militar</Text>
        </View>
      </View>

      {/* INFORMATIVOS PIAUÍ */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informativos - Piauí</Text>
        <View style={styles.helpCard}>
          <Text style={styles.helpText} onPress={() => openLink('tel:180')}>
            📞 Ligue 180 (Central de Atendimento à Mulher)
          </Text>
        </View>
        <View style={styles.helpCard}>
          <Text style={styles.helpText} onPress={() => openLink('tel:08000001673')}>
            📞 Ei, Mermã! Não Se Cale! (0800 000 1673)
          </Text>
        </View>
        <View style={styles.helpCard}>
          <Text
            style={styles.helpText}
            onPress={() => openLink('https://delegaciavirtual.sinesp.gov.br')}
          >
            🌐 Delegacia Virtual
          </Text>
        </View>
        <View style={styles.helpCard}>
          <Text
            style={styles.helpText}
            onPress={() => openLink('https://www.gov.br/mdh/pt-br/acoes-e-programas/casa-da-mulher-brasileira')}
          >
            🏛️ Casa da Mulher Brasileira - Teresina
          </Text>
        </View>
        <View style={styles.helpCard}>
          <Text
            style={styles.helpText}
            onPress={() => openLink('http://www.mp.pi.gov.br/ins/')}
          >
            🏛️ NUPEVID - Ministério Público do Piauí
          </Text>
        </View>
        <View style={styles.helpCard}>
          <Text
            style={styles.helpText}
            onPress={() => openLink('https://defensoria.pi.gov.br')}
          >
            🏛️ Defensoria Pública – Núcleo de Defesa da Mulher
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F0FC' },
  header: {
    padding: 20,
    backgroundColor: '#8B4F9F',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    position: 'relative',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#E0B8EF' },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#E57373',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  logoutText: { color: '#FFF', fontWeight: 'bold' },

  alertBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFD700', // amarelo para alertas
    padding: 12,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertButton: { marginLeft: 8 },
  alertText: { color: '#000', fontWeight: 'bold' },

  panicContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  panicButton: {
    backgroundColor: '#D72638', // vermelho de perigo
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  panicText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#B366CC',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  infoSection: { padding: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4F9F',
    marginBottom: 15,
  },
  helpCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  helpNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4F9F',
    marginBottom: 5,
  },
  helpText: { fontSize: 16, color: '#666' },
})
