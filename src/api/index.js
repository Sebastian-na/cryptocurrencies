const url =
  "https://shielded-reef-49432.herokuapp.com/https://api.coincap.io/v2"

async function getAssets(limit, offset) {
  const res = await fetch(`${url}/assets/?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorization: "Bearer 32bdd0b9-eeba-42ca-bbe5-5e0d73ff69db",
    },
  })
  const res_1 = await res.json()
  console.log(res_1.data)
  return res_1.data
}

async function getAsset(coin) {
  const res = await fetch(`${url}/assets/${coin}`, {
    headers: {
      Authorization: "Bearer 32bdd0b9-eeba-42ca-bbe5-5e0d73ff69db",
    },
  })
  const res_1 = await res.json()
  return res_1.data
}

async function getAssetHistory(coin, time, interval) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - time)
  const start = now.getTime()

  const res = await fetch(
    `${url}/assets/${coin}/history?interval=${interval}&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: "Bearer 32bdd0b9-eeba-42ca-bbe5-5e0d73ff69db",
      },
    }
  )
  const res_1 = await res.json()
  return res_1.data
}

async function getMarkets(coin) {
  const res = await fetch(`${url}/assets/${coin}/markets?limit=5`, {
    headers: {
      Authorization: "Bearer 32bdd0b9-eeba-42ca-bbe5-5e0d73ff69db",
    },
  })
  const res_1 = await res.json()
  return res_1.data
}

async function getExchange(id) {
  const res = await fetch(`${url}/exchanges/${id}`, {
    headers: {
      Authorization: "Bearer 32bdd0b9-eeba-42ca-bbe5-5e0d73ff69db",
    },
  })
  const res_1 = await res.json()
  return res_1.data
}

export { getAsset, getAssets, getAssetHistory, getMarkets, getExchange }
