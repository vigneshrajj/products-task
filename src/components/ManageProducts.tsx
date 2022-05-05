import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Paper,
    Button,
    Typography
} from '@mui/material'
import AddProduct from './AddProduct';
import { connect } from 'react-redux';
import { ProductState } from '../redux/products/products.reducer'
import { deleteProductAction } from '../redux/products/products.action';
import classes from './ManageProducts.module.scss';

interface IManageProductProps {
    products: ProductState[],
    deleteProduct: Function,
};

const ManageProducts: React.FC<IManageProductProps> = ({ products, deleteProduct }) => {

    const _handleRemove = (index: number) => {
        deleteProduct(index);
    }
    return (
        <div>
            <AddProduct />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.length ? products.map((product: any, index: number) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell width="5%"><img src={product.image} width="60" height="60" alt="preview" /></TableCell>
                            <TableCell width="auto" className={classes.tableCell} component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell width="25%" className={classes.tableCell}>{product.description || '_'}</TableCell>
                            <TableCell width="15%" className={classes.tableCell}>{product.price ? '₹' + product.price : '_'}</TableCell>
                            <TableCell><Button variant="text" color="primary" onClick={() => _handleRemove(index)}>Remove</Button></TableCell>
                        </TableRow>
                    )) : (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell colSpan={5}>
                                <Typography className={classes.notFound} variant="h6" color="text.secondary">No Products Found</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        products: state.products.productList,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteProduct: (payload: any) => dispatch(deleteProductAction(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts)