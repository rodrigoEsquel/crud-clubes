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
  describe('Email validations', () => {
    test('test@test.com should pass', () => {
      const response = validarEmail('test@test.com');
      expect(response.pass).toStrictEqual(true);
      expect(response.res).toBe('test@test.com');
    });
    test('Missing domain should not pass', () => {
      const response = validarEmail('test@.com');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
    test('Missing top-level domain should not pass', () => {
      const response = validarEmail('test@test');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
    test('Missing user should not pass', () => {
      const response = validarEmail('@test.com');
      expect(response.pass).toStrictEqual(false);
      expect(response.res).toBe('Unvalid Email');
    });
  });
});
