/* eslint-disable arrow-body-style */
/// <reference types="jest" />

import { jest } from '@jest/globals';
import validateForm from '../validateForm.js';

describe('Form validation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Result testing', () => {
    test('Correct data should pass and get team info', () => {
      const teamData = {
        name: 'Test FC', email: 'test@test.com', website: 'www.test.com', areaName: 'England', tla: 'AAA',
      };

      const response = validateForm(teamData);

      expect(response.pass).toStrictEqual(true);
      expect(JSON.stringify(response.response)).toEqual('{"name":"Test FC","email":"test@test.com","website":"www.test.com","area":{"name":"England"},"tla":"AAA"}');
    });
  });
});
