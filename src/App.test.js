import { cleanup, render } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('render app component', () => {
  render(<App />);
});
