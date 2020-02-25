const Call = async function(route) {
  const res = await fetch(`https://competa-api.dev.competa.com/api/${route}`);
  return await res.json();
}

export default Call;
