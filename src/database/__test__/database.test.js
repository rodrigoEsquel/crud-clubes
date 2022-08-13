/// <reference types="jest" />

import { jest } from '@jest/globals';
import fs from 'fs';
import db from '../database.js';

describe('Database functions', () => {
  beforeAll(() => {
    jest.mock('fs');
  });

  describe('db.getTeams()', () => {
    test('Should get teams from database', () => {
      db.getTeams();
      expect(fs.readFileSync).toHaveBeenCalled();
    });
  });
});
