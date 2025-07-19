import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { screen, render, getByTestId } from '@testing-library/react';
import UserDataContainer from './UserDataContainer';
import userEvent from '@testing-library/user-event';

vi.mock('../ControlPanel/ControlPanel', () => ({
  default: ({ setSelectedConfig }) => {
    const clickConfigBtnHandler = (configState) => {
      setSelectedConfig(prevState => {
        return {
          ...prevState,
          ...configState 
        }
      })
    }
    return <div data-testid='control-panel-component'>
      <button onClick={() => clickConfigBtnHandler({  dataType: 'topTracks'})}>Top Tracks</button>
      <button onClick={() => clickConfigBtnHandler({ timeRange: 'medium_term'})}>6 Months</button>
    </div>
  },
}));

vi.mock('../UserDataList/UserDataList', () => ({
  default: ({selectedConfig}) => {
    return <div data-testid='user-data-list-component'>
      <h1>{selectedConfig.dataType} in {selectedConfig.timeRange}</h1>
    </div>
  },
}));

describe('UserDataContainer component', () => {
    it('should render ControlPanel and UserDataList component', () => {
        render(<UserDataContainer/>);

        const controlPanelComponent = screen.getByTestId('control-panel-component');
        const userDataListComponent = screen.getByTestId('user-data-list-component');

        expect(controlPanelComponent).toBeInTheDocument()
        expect(userDataListComponent).toBeInTheDocument()
    });
    it('should render default config header initially', () => {
      render(<UserDataContainer/>);

      const configHeader = screen.getByRole('heading', { level: 1, name: 'topArtists in short_term'})

      expect(configHeader).toBeInTheDocument();
    });
    it('should update its state if a config button in ControlPanel is pressed, causing header text to change', async () => {
      render(<UserDataContainer/>);

      const topTracksBtn = screen.getByRole('button', { name: 'Top Tracks' });
      const mediumTermBtn = screen.getByRole('button', { name: '6 Months' });
      await userEvent.click(topTracksBtn);
      await userEvent.click(mediumTermBtn);

      const selectedConfigHeading = screen.getByRole('heading', { level: 1, name: 'topTracks in medium_term' });
      expect(selectedConfigHeading).toBeInTheDocument();
    });
});