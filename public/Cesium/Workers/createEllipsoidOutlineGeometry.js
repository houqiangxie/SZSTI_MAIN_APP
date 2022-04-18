/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(['./when-8d13db60', './Check-70bec281', './Math-61ede240', './Cartographic-fe4be337', './Cartesian4-5af5bb24', './arrayFill-9766fb2e', './Cartesian2-85064f09', './BoundingSphere-8f8a682c', './RuntimeError-ba10bc3e', './WebGLConstants-4c11ee5f', './ComponentDatatype-5862616f', './GeometryAttribute-ed9d707f', './PrimitiveType-97893bc7', './FeatureDetection-7bd32c34', './Transforms-878b6816', './buildModuleUrl-e7952659', './GeometryAttributes-aacecde6', './GeometryOffsetAttribute-999fc023', './IndexDatatype-9435b55f', './EllipsoidOutlineGeometry-2edc691b'], function (when, Check, _Math, Cartographic, Cartesian4, arrayFill, Cartesian2, BoundingSphere, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, Transforms, buildModuleUrl, GeometryAttributes, GeometryOffsetAttribute, IndexDatatype, EllipsoidOutlineGeometry) { 'use strict';

    function createEllipsoidOutlineGeometry(ellipsoidGeometry, offset) {
        if (when.defined(ellipsoidGeometry.buffer)) {
            ellipsoidGeometry = EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.unpack(ellipsoidGeometry, offset);
        }
        return EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.createGeometry(ellipsoidGeometry);
    }

    return createEllipsoidOutlineGeometry;

});
