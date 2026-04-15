const VALID_BET_TYPES = new Set(['color', 'number', 'parity', 'range']);
const VALID_BET_VALUES = {
  color: new Set(['red', 'black']),
  parity: new Set(['even', 'odd']),
  range: new Set(['low', 'high']),
};

function compactText(value) {
  return String(value || '').trim();
}

function lowerText(value) {
  return compactText(value).toLowerCase();
}

export function registerSchema(body) {
  const name = compactText(body.name);
  const email = lowerText(body.email);
  const password = String(body.password || '');

  if (!name || !email || password.length < 6) {
    return { error: 'Informe nome, e-mail e senha com no minimo 6 caracteres.' };
  }

  if (!email.includes('@')) {
    return { error: 'Informe um e-mail valido.' };
  }

  return { value: { name, email, password } };
}

export function loginSchema(body) {
  const email = lowerText(body.email);
  const password = String(body.password || '');

  if (!email || !password) {
    return { error: 'Informe e-mail e senha.' };
  }

  return { value: { email, password } };
}

export function roulettePlaySchema(body) {
  const amountCents = Number(body.amountCents);
  const betType = lowerText(body.betType);
  const betValue = lowerText(body.betValue);

  if (!Number.isInteger(amountCents) || amountCents < 100) {
    return { error: 'A aposta minima e R$ 1,00.' };
  }

  if (amountCents > 100000) {
    return { error: 'A aposta maxima local e R$ 1.000,00.' };
  }

  if (!VALID_BET_TYPES.has(betType)) {
    return { error: 'Tipo de aposta invalido.' };
  }

  if (betType === 'number') {
    const number = Number(betValue);
    if (!Number.isInteger(number) || number < 0 || number > 36) {
      return { error: 'Escolha um numero entre 0 e 36.' };
    }

    return { value: { amountCents, betType, betValue: String(number) } };
  }

  if (!VALID_BET_VALUES[betType].has(betValue)) {
    return { error: 'Valor de aposta invalido.' };
  }

  return { value: { amountCents, betType, betValue } };
}

export function transactionPaginationSchema(query) {
  const page = Number(query.page || 1);
  const pageSize = Number(query.pageSize || 12);

  if (!Number.isInteger(page) || page < 1) {
    return { error: 'Pagina invalida.' };
  }

  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 50) {
    return { error: 'Tamanho de pagina invalido.' };
  }

  return { value: { page, pageSize } };
}
