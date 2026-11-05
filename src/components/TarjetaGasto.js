import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
 
export default function TarjetaGasto({ gasto, onEliminar }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.informacion}>
        <Text style={styles.descripcion}>{gasto.descripcion}</Text>
        <Text style={styles.categoria}>{gasto.categoria}</Text>
      </View>
 
      <View style={styles.acciones}>
        <Text style={styles.monto}>
          {formatearMonto(gasto.monto)}
        </Text>
 
        <Pressable
          style={styles.botonEliminar}
          onPress={() => onEliminar(gasto.id)}
        >
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}
 
function formatearMonto(valor) {
  return '$ ' + valor.toLocaleString('es-AR');
}
 
const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E5EA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informacion: { flex: 1, paddingRight: 8 },
  descripcion: {
    fontSize: 16, fontWeight: 'bold', color: '#263238',
  },
  categoria: { fontSize: 13, color: '#687681', marginTop: 4 },
  acciones: { alignItems: 'flex-end' },
  monto: {
    fontSize: 16, fontWeight: 'bold', color: '#17365D',
    marginBottom: 7,
  },
  botonEliminar: {
    backgroundColor: '#FCE8E8',
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6,
  },
  textoEliminar: { color: '#B3261E', fontSize: 12, fontWeight: 'bold' },
});
