import { MockedContext, MockedContextLoading } from '../contexts/MockAppContext';
import App from '../components/App';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';



describe('<App /> during the loading phase',()=>{

    let component:any;

    beforeAll(()=>{
        component = renderer.create(<MockedContextLoading><App /></MockedContextLoading>);
    });

    afterAll(()=>{
        component = null;
    });

    it('Renders the app-container', ()=>{
        expect(component.root.findAllByProps({id: "app-container"}).length).toBe(1); 
    });
    
    it('Renders the <Loader /> component', ()=>{
        expect(component.root.findAllByProps({className: "loader"}).length).toBe(1); 
    });
    
});

describe('<App /> when context is loaded', ()=>{

    let component:any;

    beforeAll(()=>{
        component = renderer.create(<MockedContext><App /></MockedContext>);
    });

    afterAll(()=>{
        component = null;
    });

    it('AppContext is properly populated',()=>{
        let app = shallow(<MockedContext><App /></MockedContext>);
        let appContext = toJson(app).props.value;
        expect(appContext.usersList.length).toBe(2);
        expect(appContext.filteredUsersList.length).toBe(2);
        expect(appContext._currentValue.isLoading).toBeFalsy();
        expect(appContext._currentValue.modalIsOpened).toBeFalsy();
        expect(appContext._currentValue.filterIsActive).toBeFalsy();
        expect(appContext._currentValue.currentPage).toEqual(0);
        expect(appContext._currentValue.totalResults).toEqual(0);
    });

    it('Renders properly', ()=>{
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Renders the app-container', ()=>{
        expect(component.root.findAllByProps({id: "app-container"}).length).toBe(1); 
    });

    it('Renders the <Layout />', ()=>{
        expect(component.root.findAllByProps({className: "layout"}).length).toBe(1); 
    });

    it('Does not render the <Loader /> component', ()=>{
        expect(component.root.findAllByProps({className: "loader"}).length).toBe(0); 
    });
    
});