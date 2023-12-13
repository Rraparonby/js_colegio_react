import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg'
import './App.css'

/*------------------------- REACT DEFAULT -------------------------*/
import {LayoutView} from '@/views/LayoutView'
import {HomeView} from '@/views/HomeView'
//import {NoPageView} from '@/views/NoPageView.txt'

/*------------------------- GLOBAL VIEWS -------------------------*/
import {LoginView} from '@/lib/base/application/view/LoginView'
import {MainView} from '@/lib/base/application/view/MainView'

/*------------------------- GENERAL -------------------------*/
import {AlumnoView} from '@/lib/estructura/alumno/application/view/AlumnoView';
import {AlumnoMateriaView} from '@/lib/estructura/alumno_materia/application/view/AlumnoMateriaView';
import {ContratoView} from '@/lib/financiero/contrato/application/view/ContratoView';
import {DocenteView} from '@/lib/estructura/docente/application/view/DocenteView';
import {DocenteMateriaView} from '@/lib/estructura/docente_materia/application/view/DocenteMateriaView';
import {MateriaView} from '@/lib/estructura/materia/application/view/MateriaView';
import {MatriculaView} from '@/lib/proceso/matricula/application/view/MatriculaView';
import {NotaView} from '@/lib/proceso/nota/application/view/NotaView';
import {PensionView} from '@/lib/financiero/pension/application/view/PensionView';
import {SueldoView} from '@/lib/financiero/sueldo/application/view/SueldoView';

/*------------------------- LOTE -------------------------*/
import {AlumnoLoteView} from '@/lib/estructura/alumno/application/view_lote/AlumnoLoteView'
import {DocenteLoteView} from '@/lib/estructura/docente/application/view_lote/DocenteLoteView'
import {MateriaLoteView} from '@/lib/estructura/materia/application/view_lote/MateriaLoteView';
import {AlumnoMateriaLoteView} from '@/lib/estructura/alumno_materia/application/view_lote/AlumnoMateriaLoteView'

/*------------------------- REACT CLASS LOTE -------------------------*/
import {MateriaClassLoteView} from '@/views_testing/estructura/lote/MateriaClassLoteView'
import {MateriaClassView} from '@/views_testing/estructura/MateriaClassView'

function App() {
  return (
    <BrowserRouter basename='/dist/'>
    <Routes>
      <Route path="/" element={<LayoutView />}>        
      <Route index element={<HomeView />} />
      <Route path="login" element={<LoginView />} />
      <Route path="main" element={<MainView />} />
  
      <Route path="alumno" element={<AlumnoView />} />	
      <Route path="alumno_materia" element={<AlumnoMateriaView />} />	
      <Route path="contrato" element={<ContratoView />} />	
      <Route path="docente" element={<DocenteView />} />	
      <Route path="docente_materia" element={<DocenteMateriaView />} />	
      <Route path="materia" element={<MateriaView />} />	
      <Route path="matricula" element={<MatriculaView />} />	
      <Route path="nota" element={<NotaView />} />	
      <Route path="pension" element={<PensionView />} />	
      <Route path="sueldo" element={<SueldoView />} />	


      <Route path="alumno_lote" element={<AlumnoLoteView />} />
      <Route path="docente_lote" element={<DocenteLoteView />} />
      <Route path="materia_lote" element={<MateriaLoteView />} />
      <Route path="alumno_materia_lote" element={<AlumnoMateriaLoteView />} />
     
      <Route path="materia_class_lote" element={<MateriaClassLoteView />} />
      <Route path="materia_class" element={<MateriaClassView />} />
      
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
*/

export default App
