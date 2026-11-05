import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
 
import TarjetaGasto from './src/components/TarjetaGasto';
import gastosIniciales from './src/data/gastosIniciales';
 
const categorias = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Otros',
];
 
export default function App() {
  const [gastos, setGastos] = useState(gastosIniciales);
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Alimentación');
  const [filtro, setFiltro] = useState('Todos');
 
  function agregarGasto() {
    const descripcionLimpia = descripcion.trim();
    const montoNumerico = Number(monto.replace(',', '.'));
 
    if (descripcionLimpia === '') {
      Alert.alert('Dato incompleto', 'Ingresá una descripción.');
      return;
    }
 
    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      Alert.alert('Monto incorrecto', 'Ingresá un monto mayor que cero.');
      return;
    }
 
    const nuevoGasto = {
      id: Date.now().toString(),
      descripcion: descripcionLimpia,
      monto: montoNumerico,
      categoria: categoria,
    };
 
    setGastos([...gastos, nuevoGasto]);
    setDescripcion('');
    setMonto('');
  }
 
  function eliminarGasto(id) {
    const listaActualizada = gastos.filter(
      (gasto) => gasto.id !== id
    );
    setGastos(listaActualizada);
  }
 
  const totalGastado = gastos.reduce(
    (acumulado, gasto) => acumulado + gasto.monto,
    0
  );
 
  const gastosFiltrados =
    filtro === 'Todos'
      ? gastos
      : gastos.filter((gasto) => gasto.categoria === filtro);
 
  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Gestor de gastos</Text>
      <Text style={styles.subtitulo}>
        Registro y control de gastos personales
      </Text>
 
      <View style={styles.resumen}>
        <Text style={styles.etiquetaResumen}>Total gastado</Text>
        <Text style={styles.total}>
          $ {totalGastado.toLocaleString('es-AR')}
        </Text>
        <Text style={styles.cantidad}>
          {gastos.length} gasto(s) registrado(s)
        </Text>
      </View>
 
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Registrar un gasto</Text>
 
        <Text style={styles.etiqueta}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej.: Compra en supermercado"
          value={descripcion}
          onChangeText={setDescripcion}
        />
 
        <Text style={styles.etiqueta}>Monto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej.: 15000"
          value={monto}
          onChangeText={setMonto}
          keyboardType="decimal-pad"
        />
 
        <Text style={styles.etiqueta}>Categoría</Text>
        <View style={styles.listaCategorias}>
          {categorias.map((nombre) => (
            <Pressable
              key={nombre}
              style={[
                styles.botonCategoria,
                categoria === nombre && styles.categoriaSeleccionada,
              ]}
              onPress={() => setCategoria(nombre)}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  categoria === nombre && styles.textoCategoriaSeleccionada,
                ]}
              >
                {nombre}
              </Text>
            </Pressable>
          ))}
        </View>
 
        <Button title="Agregar gasto" onPress={agregarGasto} />
      </View>
 
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Mis gastos</Text>
        <Text style={styles.etiqueta}>Filtrar por categoría</Text>
 
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtros}
        >
          {['Todos', ...categorias].map((nombre) => (
            <Pressable
              key={nombre}
              style={[
                styles.botonFiltro,
                filtro === nombre && styles.filtroSeleccionado,
              ]}
              onPress={() => setFiltro(nombre)}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === nombre && styles.textoFiltroSeleccionado,
                ]}
              >
                {nombre}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
 
        {gastosFiltrados.length === 0 ? (
          <Text style={styles.mensajeVacio}>
            No hay gastos para mostrar.
          </Text>
        ) : (
          gastosFiltrados.map((gasto) => (
            <TarjetaGasto
              key={gasto.id}
              gasto={gasto}
              onEliminar={eliminarGasto}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 18,
    paddingTop: 45,
  },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#17365D' },
  subtitulo: {
    fontSize: 14, color: '#687681', marginTop: 4, marginBottom: 18,
  },
  resumen: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E1E5EA',
    padding: 18, marginBottom: 18,
  },
  etiquetaResumen: { color: '#687681', fontSize: 14 },
  total: {
    color: '#17365D', fontSize: 28, fontWeight: 'bold', marginTop: 5,
  },
  cantidad: { color: '#687681', fontSize: 12, marginTop: 5 },
  seccion: {
    backgroundColor: '#FFFFFF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E1E5EA',
    padding: 16, marginBottom: 18,
  },
  tituloSeccion: {
    color: '#17365D', fontSize: 18, fontWeight: 'bold', marginBottom: 14,
  },
  etiqueta: {
    color: '#37474F', fontSize: 13, fontWeight: 'bold', marginBottom: 6,
  },
  input: {
    borderWidth: 1, borderColor: '#D5DCE3', borderRadius: 8,
    padding: 11, fontSize: 15, marginBottom: 13,
    backgroundColor: '#FFFFFF',
  },
  listaCategorias: {
    flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16,
  },
  botonCategoria: {
    borderWidth: 1, borderColor: '#C9D3DE', borderRadius: 18,
    paddingVertical: 8, paddingHorizontal: 12,
    marginRight: 7, marginBottom: 8,
  },
  categoriaSeleccionada: {
    backgroundColor: '#17365D', borderColor: '#17365D',
  },
  textoCategoria: { color: '#37474F', fontSize: 12 },
  textoCategoriaSeleccionada: { color: '#FFFFFF' },
  filtros: { marginBottom: 14 },
  botonFiltro: {
    borderWidth: 1, borderColor: '#C9D3DE', borderRadius: 18,
    paddingVertical: 7, paddingHorizontal: 12, marginRight: 7,
  },
  filtroSeleccionado: {
    backgroundColor: '#DCE8F5', borderColor: '#17365D',
  },
  textoFiltro: { color: '#37474F', fontSize: 12 },
  textoFiltroSeleccionado: {
    color: '#17365D', fontWeight: 'bold',
  },
  mensajeVacio: {
    color: '#687681', textAlign: 'center', paddingVertical: 20,
  },
});
