import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import SearchCard from '../components/SearchCard';
import Box from '@mui/material/Box';
import ResultTable from '../components/ResultTable';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';

const backgroundImage =
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&dl=juan-encalada-6mcVaoGNz1w-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb';

export default function ProductHero() {
  const [view, setView] = React.useState('search');
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      {view === 'search' && (
        <React.Fragment>
          <Typography color="inherit" align="center" variant="h2" marked="center">
            Travel with us
          </Typography>
          <Box
            sx={{
              width: 500,
              height: 300,
            }}
            mt={5}
          >
            <SearchCard onChangeView={(view) => setView(view)} />
          </Box>
        </React.Fragment>
      )}
      {view === 'result' && (
        <Box
          sx={{
            width: 1000,
            height: 500,
          }}
          mt={5}
        >
          <Grid container spacing={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<HomeIcon />}
                onClick={() => setView('search')}
              >
                Home
              </Button>
            </Grid>
          </Grid>
          <ResultTable />
        </Box>
      )}
    </ProductHeroLayout>
  );
}
