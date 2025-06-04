import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Users } from 'lucide-react-native';

export default function AdminDashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [chartWidth, setChartWidth] = useState(350);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
    backgroundGradientFrom: isDark ? '#1C1C1E' : '#FFFFFF',
    backgroundGradientTo: isDark ? '#1C1C1E' : '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => isDark ? `rgba(96, 165, 250, ${opacity})` : `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: isDark ? '#60A5FA' : '#007AFF',
    },
  };

  const StatCard = ({ icon, title, value, trend }) => (
    <View style={[styles.statCard, isDark && styles.statCardDark]}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={[styles.statTitle, isDark && styles.textDark]}>{title}</Text>
      </View>
      <Text style={[styles.statValue, isDark && styles.textDark]}>{value}</Text>
      <Text style={[styles.statTrend, { color: trend.includes('+') ? '#10B981' : '#DC2626' }]}>
        {trend}
      </Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.header, isDark && styles.textDark]}>Admin Dashboard</Text>
      
      <View style={styles.statsGrid}>
        <StatCard
          icon={<Shield size={24} color={isDark ? '#60A5FA' : '#007AFF'} />}
          title="Total Scans"
          value="1,234"
          trend="+12.3%"
        />
        <StatCard
          icon={<AlertTriangle size={24} color="#DC2626" />}
          title="Spam Detected"
          value="89"
          trend="+5.7%"
        />
        <StatCard
          icon={<CheckCircle size={24} color="#10B981" />}
          title="False Positives"
          value="23"
          trend="-2.1%"
        />
        <StatCard
          icon={<Users size={24} color={isDark ? '#60A5FA' : '#007AFF'} />}
          title="Active Users"
          value="456"
          trend="+8.9%"
        />
      </View>

      <View style={[styles.chartCard, isDark && styles.chartCardDark]}>
        <Text style={[styles.chartTitle, isDark && styles.textDark]}>Spam Detection Trend</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  statTrend: {
    fontSize: 14,
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartCardDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1C1C1E',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  textDark: {
    color: '#FFFFFF',
  },
});