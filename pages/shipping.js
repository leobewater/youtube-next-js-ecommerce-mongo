import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';

function ShippingScreen() {
  return (
    <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1} />
    </Layout>
  )
}

export default ShippingScreen