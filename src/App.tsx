import './App.css'
import ManageProducts from './components/ManageProducts'
import Products from './components/Products'
import {Tabs, Tab, Box } from '@mui/material'
import { useState } from 'react'

function App() {
  const [tab, setTab] = useState<Number>(0);

  return (
    <div className="App">
    <Box sx={styles.tab}>
      <Tabs sx={styles.tabContainer} value={tab} onChange={(e, val) => setTab(val)} aria-label="basic tabs example">
        <Tab label="Home" value={0} />
        <Tab label="Manage Products" value={1} />
      </Tabs>
    </Box>
    {tab === 0 ? 
      <Products /> :
      <ManageProducts />
    }
    </div>
  )
}

const styles = {
  tab: { borderBottom: 1, borderColor: 'divider' },
  tabContainer: { margin: 'auto', width: '70vw' },
}

export default App
