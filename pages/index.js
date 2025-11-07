import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [formData, setFormData] = useState({
    emri: '',
    profesioni: '',
    pervoja: '',
    aftesit: '',
    arritjet: '',
    stili: 'profesional'
  })
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateBio = () => {
    setLoading(true)

    setTimeout(() => {
      const { emri, profesioni, pervoja, aftesit, arritjet, stili } = formData

      let bio = ''

      if (stili === 'profesional') {
        bio = `${emri} është një ${profesioni} me përvojë`
        if (pervoja) bio += ` ${pervoja}`
        bio += '.'

        if (aftesit) {
          bio += ` Specializohet në ${aftesit}, duke sjellë ekspertizë të thellë në fushën e tij/saj.`
        }

        if (arritjet) {
          bio += ` Ndër arritjet kryesore përfshihen ${arritjet}.`
        }

        bio += ` Me një qasje të orientuar drejt rezultateve dhe pasion për ekselencë, ${emri.split(' ')[0]} vazhdimisht kërkon të ofrojë vlerë të jashtëzakonshme në çdo projekt.`
      } else if (stili === 'krijues') {
        bio = `Njohuni me ${emri} - një ${profesioni} që transformon ide në realitet.`

        if (pervoja) {
          bio += ` Me ${pervoja} përvojë, ${emri.split(' ')[0]} ka udhëtuar përmes peizazhit dinamik të ${profesioni.toLowerCase()}.`
        }

        if (aftesit) {
          bio += ` Pasioni për ${aftesit} është ajo që e dallon atë.`
        }

        if (arritjet) {
          bio += ` ${arritjet} janë vetëm disa nga momentet që e përkufojnë rrugëtimin profesional.`
        }

        bio += ` Besimi i ${emri.split(' ')[0]} është i thjeshtë: çdo sfidë është një mundësi për të krijuar diçka të jashtëzakonshme.`
      } else {
        bio = `👋 Përshëndetje! Unë jam ${emri}, ${profesioni}.`

        if (pervoja) {
          bio += ` Kam ${pervoja} në këtë fushë dhe e dua çdo moment të saj!`
        }

        if (aftesit) {
          bio += ` 💡 Ajo që më pëlqen më shumë? ${aftesit}.`
        }

        if (arritjet) {
          bio += ` 🎯 Jam krenar/e për ${arritjet}.`
        }

        bio += ` ✨ Le të krijojmë diçka të mrekullueshme së bashku!`
      }

      setBio(bio)
      setLoading(false)
    }, 800)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bio)
    alert('Mbishkrimi u kopjua!')
  }

  return (
    <div className="container">
      <Head>
        <title>Gjenerator Mbishkrimesh - Bio Generator</title>
        <meta name="description" content="Krijoni mbishkrime profesionale në shqip" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="main">
        <h1 className="title">✨ Gjenerator Mbishkrimesh</h1>
        <p className="subtitle">Krijoni mbishkrime profesionale për profilin tuaj</p>

        <div className="form">
          <div className="form-group">
            <label htmlFor="emri">Emri Juaj *</label>
            <input
              type="text"
              id="emri"
              name="emri"
              value={formData.emri}
              onChange={handleChange}
              placeholder="p.sh. Adil Hasa"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profesioni">Profesioni/Pozicioni *</label>
            <input
              type="text"
              id="profesioni"
              name="profesioni"
              value={formData.profesioni}
              onChange={handleChange}
              placeholder="p.sh. Zhvillues Software, Dizajner Grafik"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pervoja">Përvoja</label>
            <input
              type="text"
              id="pervoja"
              name="pervoja"
              value={formData.pervoja}
              onChange={handleChange}
              placeholder="p.sh. mbi 5 vjet, që nga viti 2018"
            />
          </div>

          <div className="form-group">
            <label htmlFor="aftesit">Aftësitë Kryesore</label>
            <textarea
              id="aftesit"
              name="aftesit"
              value={formData.aftesit}
              onChange={handleChange}
              placeholder="p.sh. zhvillim web, React, Node.js, UI/UX design"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="arritjet">Arritjet/Projektet</label>
            <textarea
              id="arritjet"
              name="arritjet"
              value={formData.arritjet}
              onChange={handleChange}
              placeholder="p.sh. udhëheqja e projekteve të suksesshme, certifikime, çmime"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stili">Stili i Mbishkrimit</label>
            <select
              id="stili"
              name="stili"
              value={formData.stili}
              onChange={handleChange}
            >
              <option value="profesional">Profesional</option>
              <option value="krijues">Krijues</option>
              <option value="informal">Informal</option>
            </select>
          </div>

          <button
            className="btn-primary"
            onClick={generateBio}
            disabled={!formData.emri || !formData.profesioni || loading}
          >
            {loading ? 'Duke gjeneruar...' : '🚀 Gjenero Mbishkrimin'}
          </button>
        </div>

        {bio && (
          <div className="result">
            <h2>📝 Mbishkrimi Juaj:</h2>
            <div className="bio-text">
              {bio}
            </div>
            <button className="btn-secondary" onClick={copyToClipboard}>
              📋 Kopjo në Clipboard
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Krijuar me ❤️ për profesionistë shqiptarë</p>
      </footer>
    </div>
  )
}
