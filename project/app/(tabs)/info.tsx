import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

export default function InfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informações</Text>
        <Text style={styles.headerSubtitle}>
          Conheça seus direitos e saiba como se proteger
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de Violência</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Violência Física</Text>
          <Text style={styles.infoDescription}>
            Qualquer conduta que ofenda a integridade ou saúde corporal da mulher.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Violência Psicológica</Text>
          <Text style={styles.infoDescription}>
            Ações que causem dano emocional, controle da vida, ameaças, humilhação, chantagem, manipulação ou isolamento.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Violência Sexual</Text>
          <Text style={styles.infoDescription}>
            Qualquer conduta que force a mulher a presenciar, manter ou participar de relação sexual não desejada.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Violência Patrimonial</Text>
          <Text style={styles.infoDescription}>
            Controle ou destruição de objetos, documentos, bens, valores ou recursos econômicos da mulher.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Violência Moral</Text>
          <Text style={styles.infoDescription}>
            Calúnia, difamação ou injúria que atentem contra a dignidade ou reputação da mulher.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Assédio</Text>
          <Text style={styles.infoDescription}>
            Condutas indesejadas com intuito de intimidar, constranger ou humilhar a vítima, especialmente no trabalho ou em espaços públicos.
          </Text>
        </View>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legislação</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lei Maria da Penha</Text>
          <Text style={styles.infoDescription}>
            Lei 11.340/2006 - Cria mecanismos para coibir a violência doméstica e familiar contra a mulher.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lei do Minuto Seguinte</Text>
          <Text style={styles.infoDescription}>
            Lei 12.845/2013 - Garante atendimento imediato e humanizado a vítimas de violência sexual no SUS.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lei do Feminicídio</Text>
          <Text style={styles.infoDescription}>
            Lei 13.104/2015 - Tipifica o feminicídio como circunstância qualificadora do homicídio, com penas mais severas.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lei Carolina Dieckmann</Text>
          <Text style={styles.infoDescription}>
            Lei 12.737/2012 - Criminaliza a invasão de dispositivos eletrônicos e divulgação de conteúdos íntimos sem consentimento.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lei da Importunação Sexual</Text>
          <Text style={styles.infoDescription}>
            Lei 13.718/2018 - Criminaliza atos libidinosos sem consentimento em locais públicos ou privados.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0FC',
  },
  header: {
    padding: 20,
    backgroundColor: '#8B4F9F',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0B8EF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4F9F',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4F9F',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  linkCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4F9F',
    marginBottom: 4,
  },
  linkDescription: {
    fontSize: 14,
    color: '#666',
  },
});