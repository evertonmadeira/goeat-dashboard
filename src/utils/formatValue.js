const formatValue = (value) =>
  Intl.NumberFormat('br-BR', { style: 'currency', currency: 'BRL' }).format(
    value,
  );
export default formatValue;