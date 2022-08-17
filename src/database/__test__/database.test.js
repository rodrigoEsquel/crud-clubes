/// <reference types="jest" />

import { jest } from '@jest/globals';
import fs from 'fs';
import db from '../database.js';

describe('Database functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Get Teams test', () => {
    test('Function should get teams from database', () => {
      const readFileSpy = jest.spyOn(fs, 'readFileSync');
      db.getTeams();
      expect(readFileSpy).toHaveBeenCalled();
    });
  });
    });
  });
});
