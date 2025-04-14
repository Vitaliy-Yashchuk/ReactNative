import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from './index';

describe('HomeScreen', () => {
  it('відображає заголовок "Мій To-Do List"', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Мій To-Do List')).toBeTruthy();
  });

  it('має поле для введення назви завдання', () => {
    render(<HomeScreen />);
    expect(screen.getByPlaceholderText('Назва завдання')).toBeTruthy();
  });

  it('додає нове завдання до списку', () => {
    render(<HomeScreen />);
    
    const input = screen.getByPlaceholderText('Назва завдання');
    const button = screen.getByText('Додати');
    
    fireEvent.changeText(input, 'Нове тестове завдання');
    fireEvent.press(button);
    
    expect(screen.getByText('Нове тестове завдання')).toBeTruthy();
    expect(input.props.value).toBe('');
  });

  it('не додає пусте завдання', () => {
    render(<HomeScreen />);
    
    const button = screen.getByText('Додати');
    fireEvent.press(button);
    
    expect(screen.queryAllByTestId('task-item').length).toBe(0);
  });
});