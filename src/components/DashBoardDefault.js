import React,{createRef,Component, Suspense} from 'react';
import { withTranslation } from 'react-i18next';

class DashBoardDefault extends React.Component{

render() { 
     //this is set for translation
 const { t } = this.props;
    return(
    <div>
{t('dashboard.defeultText')}
    </div>

    )
}
};
export default withTranslation()(DashBoardDefault)