/**
 * WAZIUP API
 * Applications API
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['expect.js', '../../src/index'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS-like environments that support module.exports, like Node.
        factory(require('expect.js'), require('../../src/index'));
    } else {
        // Browser globals (root is window)
        factory(root.expect, root.WaziupApi);
    }
}(this, function(expect, WaziupApi) {
    'use strict';

    var instance;

    beforeEach(function() {
        instance = new WaziupApi.UsersApi();
    });

    var getProperty = function(object, getter, property) {
        // Use getter method if present; otherwise, get the property directly.
        if (typeof object[getter] === 'function')
            return object[getter]();
        else
            return object[property];
    }

    var setProperty = function(object, setter, property, value) {
        // Use setter method if present; otherwise, set the property directly.
        if (typeof object[setter] === 'function')
            object[setter](value);
        else
            object[property] = value;
    }

    describe('UsersApi', function() {
        describe('AuthPost', function() {
            it('should call AuthPost successfully', function(done) {
                //uncomment below and update the code to test AuthPost
                //instance.AuthPost(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersGet', function() {
            it('should call UsersGet successfully', function(done) {
                //uncomment below and update the code to test UsersGet
                //instance.UsersGet(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersPost', function() {
            it('should call UsersPost successfully', function(done) {
                //uncomment below and update the code to test UsersPost
                //instance.UsersPost(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersSearchGet', function() {
            it('should call UsersSearchGet successfully', function(done) {
                //uncomment below and update the code to test UsersSearchGet
                //instance.UsersSearchGet(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersUseridDelete', function() {
            it('should call UsersUseridDelete successfully', function(done) {
                //uncomment below and update the code to test UsersUseridDelete
                //instance.UsersUseridDelete(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersUseridGet', function() {
            it('should call UsersUseridGet successfully', function(done) {
                //uncomment below and update the code to test UsersUseridGet
                //instance.UsersUseridGet(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
        describe('UsersUseridPut', function() {
            it('should call UsersUseridPut successfully', function(done) {
                //uncomment below and update the code to test UsersUseridPut
                //instance.UsersUseridPut(function(error) {
                //  if (error) throw error;
                //expect().to.be();
                //});
                done();
            });
        });
    });

}));