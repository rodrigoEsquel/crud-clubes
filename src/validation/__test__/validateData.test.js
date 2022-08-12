/// <reference types="jest" />

import { jest } from '@jest/globals';
import {
  validarAreaName, validarEmail, validarName, validarTla, validarWebsite,
} from '../validateData.js';

describe('Item validation from inputs', () => {
  describe('Area Name validations', () => {
    test('England should pass', () => {
      const response = validarAreaName('England');

      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('England');
    });
    test('Argentina should not pass', () => {
      const response = validarAreaName('Argentina');

      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
    test('Empty array should not pass', () => {
      const response = validarAreaName('');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
    test('Undefined should not pass', () => {
      const response = validarAreaName();
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Area name should be England');
    });
  });
});
