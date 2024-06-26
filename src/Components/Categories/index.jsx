import { useSelector, useDispatch } from 'react-redux';
import { updateCategory } from '../../store/global-action/actions.js';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/categories/index.js';

export default function Categories() {

  const categories = useSelector(state => state.category.categories);
  const activeCategory = useSelector(state => state.category.activeCategory)
  const dispatch = useDispatch();

  const handleClick = (category) => {
    dispatch(updateCategory(category.name))
  }

  const clearCategory = () => {
    dispatch(updateCategory(''))
  };

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const wantedCategories = ["Indica", "Sativa", "Hybrid", "Cleaning"]
  return (
    <section>
      <h2>Browse our Categories</h2>
      {activeCategory ? <h3> Selected Category: {activeCategory}</h3> : <h3>Please Select A Category</h3>}
      <Button onClick={() => clearCategory()}>Reset</Button>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {categories.map((category, idx) => {
          if (wantedCategories.includes(category.name)) {
            return <Card key={idx} sx={{ minWidth: 275 }} >
              <CardContent>
                <Typography variant="h5" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleClick(category)}>Select</Button>
              </CardActions>
            </Card>
          }
        })}
      </Box>
    </section>
  );
}
