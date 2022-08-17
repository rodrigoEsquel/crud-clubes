/// <reference types="jest" />

import { jest } from '@jest/globals';
import fs from 'fs';
import db from '../database.js';

describe('Database functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('db.getTeams()', () => {
    test('Should get teams from database', () => {
      db.getTeams();
      expect(fs.readFileSync).toHaveBeenCalled();
    });
  });
});
