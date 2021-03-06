/*
Class for inline-styling html elements
 */

function CSSUtilities() {
}
(function () {
  var Z = this;
  Z._N1 = false;
  Z.supported = false;
  if (typeof document.getElementById == 'undefined' || typeof document.styleSheets == 'undefined' || typeof document.nodeType == 'undefined') {
    return;
  }
  Z.supported = true;
  var A = false, B = 'Network Failure or Security Violation', C = 'Network Failure', D = 'Security Violation', E = 'Unspecified Error', F = 'Data is not CSS', R = 'unknown', S = 'OK', U = 'Discarded Duplicate', T = 'Stylesheet is disabled', V = 'Unsupported node type', H = 'CSSUtilities ' + '(Fatal Error):', I = H + ' The specified mode is not valid', G = H + ' The specified async setting is not valid', J = H + ' The specified document is not a Document', K = H + ' The specified base is not an absolute URL', L = H + ' The specified watch setting is not valid', P = H + ' The specified attributes setting is not valid', M = H + ' The specified api settings are not valid', O = H + ' Your Selectors API is not returning the right data', N = H + ' The Selectors API is missing', Q = H + ' Unable to communicate with the network', W = 'CSSUtilities.%method has an invalid Element reference or ID', X = 'CSSUtilities.%method requires a valid Selector reference', Y = 'CSSUtilities.%method can only process one Selector at a time', A0 = 'CSSUtilities.%method has an invalid Stylesheet ID', B0 = H + ' You cannot define "%var" after "api",' + ' it must be defined first', B1 = 'all', C1 = 'screen', D1 = 'none', E1 = 'current', F1 = 'aural,braille,embossed,handheld,print,projection,reader,screen,speech,tty,tv', C0 = {
    'azimuth': 0,
    'border-collapse': 0,
    'border-spacing': 0,
    'caption-side': 0,
    'color': 0,
    'cursor': 0,
    'direction': 0,
    'elevation': 0,
    'empty-cells': 0,
    'fit': 0,
    'fit-position': 0,
    'font': 0,
    'font-family': 0,
    'font-size': 0,
    'font-size-adjust': 0,
    'font-stretch': 0,
    'font-style': 0,
    'font-variant': 0,
    'font-weight': 0,
    'hanging-punctuation': 0,
    'hyphenate-after': 0,
    'hyphenate-before': 0,
    'hyphenate-character': 0,
    'hyphenate-lines': 0,
    'hyphenate-resource': 0,
    'hyphens': 0,
    'image-resolution': 0,
    'letter-spacing': 0,
    'line-height': 0,
    'line-stacking': 0,
    'line-stacking-ruby': 0,
    'line-stacking-shift': 0,
    'line-stacking-strategy': 0,
    'list-style': 0,
    'list-style-image': 0,
    'list-style-position': 0,
    'list-style-type': 0,
    'marquee-direction': 0,
    'orphans': 0,
    'overflow-style': 0,
    'page': 0,
    'page-break-inside': 0,
    'pitch': 0,
    'pitch-range': 0,
    'presentation-level': 0,
    'punctuation-trim': 0,
    'quotes': 0,
    'richness': 0,
    'ruby-align': 0,
    'ruby-overhang': 0,
    'ruby-position': 0,
    'speak': 0,
    'speak-header': 0,
    'speak-numeral': 0,
    'speak-punctuation': 0,
    'speech-rate': 0,
    'stress': 0,
    'text-align': 0,
    'text-align-last': 0,
    'text-emphasis': 0,
    'text-height': 0,
    'text-indent': 0,
    'text-justify': 0,
    'text-outline': 0,
    'text-replace': 0,
    'text-shadow': 0,
    'text-transform': 0,
    'text-wrap': 0,
    'visibility': 0,
    'voice-balance': 0,
    'voice-family': 0,
    'voice-rate': 0,
    'voice-pitch': 0,
    'voice-pitch-range': 0,
    'voice-stress': 0,
    'voice-volume': 0,
    'volume': 0,
    'white-space': 0,
    'white-space-collapse': 0,
    'widows': 0,
    'word-break': 0,
    'word-spacing': 0,
    'word-wrap': 0,
    '-moz-force-broken-image-icon': 0,
    '-moz-image-region': 0,
    '-moz-stack-sizing': 0,
    '-moz-user-input': 0,
    '-x-system-font': 0,
    '-xv-voice-balance': 0,
    '-xv-voice-pitch': 0,
    '-xv-voice-pitch-range': 0,
    '-xv-voice-rate': 0,
    '-xv-voice-stress': 0,
    '-xv-voice-volume': 0,
    '-ms-text-align-last': 0,
    '-ms-text-justify': 0,
    '-ms-word-break': 0,
    '-ms-word-wrap': 0
  }, D0 = {
    'margin': ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    'padding': ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
    'outline': ['outline-width', 'outline-style', 'outline-color'],
    'border': ['border-width', 'border-style', 'border-color', 'border-top', 'border-right', 'border-bottom', 'border-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
    'border-width': ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
    'border-style': ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
    'border-color': ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
    'border-top': ['border-top-width', 'border-top-style', 'border-top-color'],
    'border-right': ['border-right-width', 'border-right-style', 'border-right-color'],
    'border-bottom': ['border-bottom-width', 'border-bottom-style', 'border-bottom-color'],
    'border-left': ['border-left-width', 'border-left-style', 'border-left-color'],
    'list-style': ['list-style-type', 'list-style-image', 'list-style-position'],
    'font': ['font-weight', 'font-style', 'font-variant', 'font-size', 'line-height', 'font-family'],
    'background': ['background-color', 'background-image', 'background-repeat', 'background-attachment', 'background-position', 'background-size', 'background-clip', 'background-origin'],
    'line-stacking': ['line-stacking-strategy', 'line-stacking-ruby', 'line-stacking-shift'],
    'column-rule': ['column-rule-width', 'column-rule-style', 'column-rule-color'],
    'columns': ['column-width', 'column-count'],
    'pause': ['pause-before', 'pause-after'],
    'rest': ['rest-before', 'rest-after'],
    'cue': ['cue-before', 'cue-after'],
    'mark': ['mark-before', 'mark-after'],
    'transition': ['transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'],
    'animation': ['animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay', 'animation-iteration-count', 'animation-direction'],
    'target': ['target-name', 'target-new', 'target-position']
  }, F0 = /[:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\))/i, G0 = /([:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\)))/ig, H0 = /([:](?:(link|visited|active|hover|focus|lang|root|empty|target|enabled|disabled|checked|default|valid|invalid|required|optional)|((in|out\-of)\-range)|(read\-(only|write))|(first|last|only|nth)(\-last)?\-(child|of\-type))(?:\([_a-z0-9\-\+\.\\]*\))?)/ig, I0 = /(\[\s*[_a-z0-9-:\.\|\\]+\s*(?:[~\|\*\^\$]?=\s*[\"\'][^\"\']*[\"\'])?\s*\])/ig, J0 = /(#[a-z]+[_a-z0-9-:\\]*)/ig, K0 = /(\.[_a-z]+[_a-z0-9-:\\]*)/ig, L0 = /\!\s*important\s*$/i, M0 = 'CSSUtilities/.99', N0 = 'undefined', O0 = 'object', P0 = 'string', Q0 = 'function', R0 = 'boolean', S0 = true, T0 = false, U0 = null, V0 = 'browser', W0 = 'author', X0 = 'active', Y0 = 'cancelled', A1 = 'inactive', H1 = navigator.vendor == 'Apple Computer,' + ' Inc.', G1 = H1 && /version\/3/i.test(navigator.appVersion), I1 = navigator.vendor == 'KDE', J1 = /applewebkit/i.test(navigator.userAgent), K1 = typeof document.uniqueID != N0, L1 = typeof window.opera != N0, M1 = 200, mode = V0, async = T0, page = document, base, watch = T0, attributes = S0, api = U0, qsa = U0, B5 = T0;
  Z.define = function (Q6, O5, P5) {
    switch (Q6) {
      case 'mode':
        if (typeof O5 != P0 || !/^(author|browser)$/i.test(O5)) {
          throw(new Error(I));
        }
        mode = O5;
        if (mode == V0 && watch === U0) {
          throw(new Error(L));
        }
        break;
      case 'async':
        if (typeof O5 != R0) {
          throw(new Error(G));
        }
        async = O5;
        break;
      case 'page':
        if (B5 == S0) {
          throw(new Error(B0.replace('%var', 'page')));
        }
        if (typeof O5.nodeType == N0 || O5.nodeType != 9) {
          throw(new Error(J));
        }
        page = O5;
        break;
      case 'base':
        if (B5 == S0) {
          throw(new Error(B0.replace('%var', 'base')));
        }
        if (typeof O5 != P0 || !/^(((ht|f)tp[s]?)\:)/i.test(O5)) {
          throw(new Error(K));
        }
        base = O5;
        break;
      case 'attributes':
        if (typeof O5 != R0) {
          throw(new Error(P));
        }
        attributes = O5;
        break;
      case 'watch':
        if (!(typeof O5 == R0 || (mode == W0 && O5 == U0))) {
          throw(new Error(L));
        }
        watch = O5;
        break;
      case 'api':
        if (typeof O5 != R0) {
          throw(new Error(M));
        }
        if (typeof P5 != N0) {
          if (typeof P5 != Q0) {
            throw(new Error(M));
          }
        }
        if (O5 == T0) {
          api = typeof page.querySelectorAll == N0;
        } else {
          api = S0;
        }
        B5 = S0;
        if (typeof P5 == Q0) {
          var D4 = P5('*', page);
          if (typeof D4 != O0 || D4 == U0 || typeof D4.length == N0) {
            throw(new Error(O));
          }
          qsa = P5;
        }
        break;
    }
  };
  Z.init = function (X5) {
    if (A === S0) {
      return;
    }
    A = S0;
    Z._N1 = T0;
    api = (typeof page.querySelectorAll != N0 && api !== S0) ? T0 : S0;
    if (base == U0) {
      base = page.location.href;
    }
    Z._N5 = (L1 && page.documentElement.namespaceURI != U0) || (!L1 && (typeof page.xmlVersion != N0 && page.xmlVersion != U0));
    Z._Y6 = f30();
    Z._S1 = U0;
    delete Z._S1;
    Z._T1 = U0;
    delete Z._T1;
    function Q2() {
      A = T0;
      CSSUtilities._N1 = S0;
      if (typeof X5 == Q0) {
        CSSUtilities.W1 = X5;
        CSSUtilities.W1();
      } else {
        CSSUtilities.W1 = U0;
        delete CSSUtilities.W1;
      }
    }
    
    Z._S1 = [];
    Z._T1 = [];
    Z.Y4 = 0;
    if (mode == W0) {
      f0(Q2);
    } else {
      f15(Q2);
    }
  };
  Z.getCSSStyleSheets = function () {
    var P1 = f36(arguments, []);
    P1.M6 = f40(P1.M6);
    f35();
    return f41(P1.M6, function () {
      return Z._T1;
    });
  };
  Z.getCSSRules = function () {
    var P1 = f36(arguments, ['D5', 'media', 'F5', 'S5']);
    P1.D5 = f37(P1.D5, 'getCSSRules');
    P1.media = f38(P1.media);
    P1.F5 = f39(P1.F5);
    if (P1.S5 == U0) {
      P1.S5 = T0;
    }
    P1.M6 = f40(P1.M6);
    f35();
    return f41(P1.M6, function () {
      return f20(P1.D5, P1.media, P1.F5, P1.S5);
    });
  };
  Z.getCSSStyleSheetRules = function () {
    var P1 = f36(arguments, ['media', 'F5', 'ssid']);
    P1.media = f38(P1.media);
    P1.F5 = f39(P1.F5);
    if (typeof P1.F5.properties != N0 && typeof P1.F5.css == N0) {
      P1.F5.css = '';
      var E4 = S0;
    }
    if (P1.ssid === U0) {
      P1.ssid = -1;
    }
    P1.M6 = f40(P1.M6);
    f35();
    if (P1.ssid !== -1 && f43(Z._T1, P1.ssid, 'ssid') == U0) {
      throw(new Error(A0.replace('%method', 'getCSSStyleSheetRules')));
    }
    return f41(P1.M6, function () {
      var rules = [];
      for (var i = 0; i < Z._S1.length; i++) {
        var A5 = {};
        if (f29(P1.media, Z._S1[i])) {
          if (P1.ssid !== -1 && Z._S1[i].ssid !== P1.ssid) {
            continue;
          }
          for (var j in Z._S1[i]) {
            if (!Z._S1[i].hasOwnProperty(j)) {
              continue;
            }
            if (P1.F5 == '*' || typeof P1.F5[j] != N0) {
              A5[j] = Z._S1[i][j];
            }
          }
          if (P1.F5 == '*' || typeof P1.F5.index != N0) {
            A5.index = i;
          }
          rules.push(A5);
        }
      }
      if (typeof P1.F5.properties != N0 || P1.F5 === '*') {
        rules = f22(rules, T0);
      }
      if (typeof E4 != N0) {
        for (var i = 0; i < rules.length; i++) {
          rules[i].css = U0;
          delete rules[i].css;
        }
      }
      return rules;
    });
  };
  Z.getCSSProperties = function () {
    var P1 = f36(arguments, ['D5', 'media']);
    P1.D5 = f37(P1.D5, 'getCSSProperties');
    P1.media = f38(P1.media);
    P1.M6 = f40(P1.M6);
    f35();
    return f41(P1.M6, function () {
      var properties = {};
      var rules = f20(P1.D5, P1.media, 'properties', T0);
      if (rules.length == 0) {
        return U0;
      }
      for (var i = 0; i < rules.length; i++) {
        for (var j in rules[i].properties) {
          if (!rules[i].properties.hasOwnProperty(j) || rules[i].properties[j].status != X0) {
            continue;
          }
          properties[j] = rules[i].properties[j].value;
        }
      }
      return properties;
    });
  };
  Z.getCSSSelectors = function () {
    var P1 = f36(arguments, ['D5', 'media', 'S2']);
    P1.D5 = f37(P1.D5, 'getCSSSelectors');
    P1.media = f38(P1.media);
    if (P1.S2 == U0) {
      P1.S2 = S0;
    }
    P1.M6 = f40(P1.M6);
    f35();
    return f41(P1.M6, function () {
      var M2 = [];
      var rules = f20(P1.D5, P1.media, 'selector', S0);
      for (var i = 0; i < rules.length; i++) {
        var K4 = f26(rules[i].selector);
        for (var j = 0; j < K4.length; j++) {
          if (f43(M2, K4[j]) == U0) {
            M2.push(K4[j]);
          }
        }
      }
      if (P1.S2 == T0) {
        var node = P1.D5, F2 = [node];
        while (node.parentNode) {
          F2.push(node.parentNode);
          node = node.parentNode;
        }
        for (var i = 0; i < M2.length; i++) {
          var N2 = T0;
          for (var j = 0; j < F2.length; j++) {
            var D4 = f33(M2[i].replace(H0, ''));
            if (D4.length > 0) {
              for (var k = 0; k < D4.length; k++) {
                if (D4[k] == F2[j]) {
                  N2 = S0;
                  break;
                }
              }
            }
            if (N2 == S0) {
              break;
            }
          }
          if (N2 == T0) {
            M2.splice(i, 1);
            i--;
          }
        }
        return M2;
      }
      var K4 = [];
      for (var i = 0; i < M2.length; i++) {
        var D4 = f33(M2[i].replace(H0, ''));
        if (D4.length > 0) {
          for (var j = 0; j < D4.length; j++) {
            if (D4[j] == P1.D5) {
              K4.push(M2[i]);
              break;
            }
          }
        }
      }
      return K4;
    });
  };
  Z.getCSSSelectorSpecificity = function () {
    var P1 = f36(arguments, ['selector', 'D5']);
    if (typeof P1.selector != P0 || P1.selector == U0 || f42(P1.selector) == '') {
      throw(new Error(X.replace('%method', 'getCSSSelectorSpecificity')));
    } else if (P1.selector.indexOf(',') != -1) {
      throw(new Error(Y.replace('%method', 'getCSSSelectorSpecificity')));
    }
    if (P1.D5 != U0) {
      P1.D5 = f37(P1.D5, 'getCSSSelectorSpecificity');
    }
    P1.M6 = f40(P1.M6);
    f35();
    return f41(P1.M6, function () {
      P1.selector = f42(P1.selector);
      if (P1.D5 != U0) {
        var N2 = T0, D4 = f33(P1.selector.replace(H0, ''));
        if (D4.length > 0) {
          for (var j = 0; j < D4.length; j++) {
            if (D4[j] == P1.D5) {
              N2 = S0;
              break;
            }
          }
        }
        if (N2 == T0) {
          var node = P1.D5, F2 = [node];
          while (node.parentNode) {
            F2.push(node);
            node = node.parentNode;
          }
          for (var i = 0; i < F2.length; i++) {
            if (D4.length > 0) {
              for (var j = 0; j < D4.length; j++) {
                if (D4[j] == F2[i]) {
                  N2 = S0;
                  break;
                }
              }
            }
            if (N2 == S0) {
              break;
            }
          }
          if (N2 == S0) {
            return [0, 0, 0, 0];
          } else {
            return U0;
          }
        }
      }
      return f23(P1.selector);
    });
  };
  function f41(M6, P6) {
    if (Z._N1 !== S0 && M6 == U0) {
      return;
    }
    if (M6 == U0) {
      return P6();
    } else {
      if (Z._N1 === S0) {
        M6(P6());
      } else {
        var O6 = window.setInterval(function () {
          if (Z._N1 === S0) {
            window.clearInterval(O6);
            M6(P6());
          }
        }, M1);
      }
    }
  }
  
  function f0(F4) {
    Z._U1 = [];
    if (K1 && f34('style').length > 0) {
      f8(E7);
    } else {
      E7();
    }
    function E7() {
      var A4 = f9();
      for (var i = 0; i < A4.length; i++) {
        f10(A4[i], A4[i].nodeType == 7 ? A4[i].target.toLowerCase() : A4[i].nodeName.toLowerCase());
      }
      function f1(Y5) {
        f2(Z._U1[Y5], function (V1) {
          Z._U1[Y5] = V1;
          if (Y5 + 1 < Z._U1.length) {
            f1(Y5 + 1);
          } else {
            f3();
          }
        });
      }
      
      function f2(V1, F4) {
        if (V1.href == U0) {
          F4(V1);
        } else {
          f11(V1.href, function (P4) {
            if (P4.message != U0) {
              V1.message = P4.message;
              V1.stylenode = U0;
              if (V1.message == F || /^[1-9]{1,3}/.test(V1.message)) {
                V1.media = D1;
              }
            } else {
              V1.text = f13(P4.text, T0);
            }
            F4(V1);
          });
        }
      }
      
      function f3() {
        function f4(E6) {
          function Q2(I6) {
            if (E6 + 1 < Z._U1.length) {
              f4(E6 + I6);
            } else {
              f7();
            }
          }
          
          if (Z._U1[E6].D6 == S0) {
            Q2(1);
          } else {
            var J6 = f12(Z._U1[E6].text);
            Z._U1[E6].D6 = S0;
            Z._U1[E6].ssid = Z.Y4++;
            if (J6.length > 0) {
              function f5(F6) {
                f6(E6, F6, J6[F6], function (V1, G6, H6) {
                  Z._U1.splice((E6 + H6), 0, V1);
                  if (H6 + 1 < J6.length) {
                    f5(H6 + 1);
                  } else {
                    Q2(0);
                  }
                });
              }
              
              f5(0);
            } else {
              Q2(1);
            }
          }
        }
        
        f4(0);
      }
      
      function f6(Y5, C6, K6, F4) {
        var V1 = {
          'D6': T0,
          'owner': '@import',
          'media': B1,
          'stylenode': Z._U1[Y5].stylenode,
          'href': K6.href,
          'text': ''
        };
        V1.media = K6.media;
        var n = Y5, parent = Z._U1[n];
        while (parent.href == V1.href) {
          parent = Z._U1[n--];
        }
        I2 = parent.media;
        V1.xmedia = K6.V5 ? K6.media : B1;
        V1.media = f28(I2, V1.media);
        function O4(fdata) {
          if (fdata.message != U0) {
            V1.message = fdata.message;
            V1.stylenode = U0;
            if (V1.message == F || /^[1-9]{1,3}.*$/.test(V1.message)) {
              V1.media = D1;
            }
          } else {
            V1.text = f13(fdata.text, T0);
          }
          F4(V1, Y5, C6);
        }
        
        if (f43(Z._U1, K6.href, 'href') != U0) {
          O4({'text': '', 'message': U});
        } else {
          f11(K6.href, O4);
        }
      }
      
      function f7() {
        for (var i = 0; i < Z._U1.length; i++) {
          if (Z._U1[i].href) {
            var Q5 = f43(Z._T1, Z._U1[i].href, 'href');
            if (Q5 != U0 && Q5.message != U) {
              Z._T1.push({
                'ssid': Z._U1[i].ssid,
                'href': Z._U1[i].href,
                'owner': Z._U1[i].owner,
                'media': Z._U1[i].media,
                'xmedia': Z._U1[i].xmedia,
                'stylenode': U0,
                'rules': 0,
                'message': U
              });
              if (Z._U1[i].stylenode) {
                Z._U1[i].stylenode.disabled = S0;
              }
              continue;
            }
          }
          if (typeof Z._U1[i].message != N0) {
            Z._T1.push({
              'ssid': Z._U1[i].ssid,
              'href': Z._U1[i].href,
              'owner': Z._U1[i].owner,
              'media': Z._U1[i].media,
              'xmedia': Z._U1[i].xmedia,
              'stylenode': Z._U1[i].stylenode,
              'rules': 0,
              'message': Z._U1[i].message
            });
            continue;
          }
          var P2 = f14(Z._U1[i]);
          Z._T1.push({
            'ssid': Z._U1[i].ssid,
            'href': Z._U1[i].href,
            'owner': Z._U1[i].owner,
            'media': Z._U1[i].media,
            'xmedia': Z._U1[i].xmedia,
            'stylenode': Z._U1[i].stylenode,
            'rules': P2,
            'message': S
          });
        }
        Z._U1 = U0;
        delete Z._U1;
        Z._T1.sort(function (a, b) {
          return a.ssid - b.ssid;
        });
        Z.Y4 = U0;
        delete Z.Y4;
        if (watch === S0) {
          f31();
        }
        if (typeof F4 == Q0) {
          F4();
        }
      }
      
      if (Z._U1.length == 0) {
        f7();
      } else {
        f1(0);
      }
    }
  }
  
  function f8(F4) {
    f48(async, base, function (code) {
      var A4 = f34('style');
      var J5 = code.split(/<([^:]+:)?style[^>]*>/i);
      J5.splice(0, 1);
      for (var j = 0; j < J5.length; j++) {
        A4[j].__css = J5[j].split(/<\/([^:]+:)?style>/i)[0];
      }
      delete J5;
      F4();
    }, function () {
      F4();
    });
  }
  
  function f9() {
    var A4 = [];
    var V4 = page.childNodes;
    for (var i = 0; i < V4.length; i++) {
      if (V4[i].nodeType == 7 && V4[i].target.toLowerCase() == 'xml-stylesheet') {
        A4.push(V4[i]);
      }
    }
    var E2 = f34('*');
    for (var i = 0; i < E2.length; i++) {
      if ((/link/i.test(E2[i].nodeName) && /stylesheet/i.test(E2[i].getAttribute('rel'))) || /style/i.test(E2[i].nodeName)) {
        A4.push(E2[i]);
      }
    }
    return A4;
  }
  
  function f10(node, owner) {
    var V1 = {'D6': T0, 'owner': owner, 'media': B1, 'stylenode': node, 'href': U0, 'text': ''};
    if (/xml\-stylesheet/.test(owner)) {
      var S4 = {}, T4 = node.data.match(/([a-z]+=[\'\"][^\'\"]*[\'\"])/gm);
      for (var i = 0; i < T4.length; i++) {
        T4[i] = T4[i].split('=');
        S4[T4[i][0]] = T4[i][1].substr(1, T4[i][1].length - 2);
      }
    }
    if ((H1 || I1 || J1) && !/xml\-stylesheet/.test(owner)) {
      var Q4 = node.disabled;
    } else {
      var Y2 = node[typeof node.styleSheet != N0 ? 'styleSheet' : 'sheet'], Q4 = Y2 == U0 ? S0 : Y2.disabled;
    }
    if (L1 && Q4 && node.sheet.media.length > 0) {
      var R4 = node.sheet.media.mediaText;
      node.sheet.media.mediaText = Z._Y6;
      Q4 = node.sheet.disabled;
      node.sheet.media.mediaText = R4;
    }
    if (watch !== U0 && Q4) {
      V1.message = T;
    }
    if (/xml\-stylesheet/.test(owner)) {
      V1.href = f47(S4.href, base);
    } else if (/link/i.test(owner)) {
      V1.href = f47(node.getAttribute('href', 2), base);
    } else {
      if (!Q4 || watch === U0) {
        if (K1) {
          if (typeof node.__css == N0) {
            V1.message = C;
          } else {
            V1.text += f13(node.__css, T0);
          }
        } else {
          for (var T4 = '', V4 = node.childNodes, i = 0; i < V4.length; i++) {
            switch (V4[i].nodeType) {
              case 3:
                T4 += V4[i].nodeValue;
                break;
              case 4:
                T4 += '<![CDATA[' + V4[i].nodeValue + ']]>';
                break;
              case 8:
                T4 += '<!--' + V4[i].nodeValue + '-->';
                break;
            }
          }
          V1.text += f13(T4, T0);
        }
      }
    }
    if (/xml\-stylesheet/.test(owner)) {
      V1.media = typeof S4.media != N0 ? S4.media : B1;
    } else {
      V1.media = node.getAttribute('media') ? node.getAttribute('media') : B1;
    }
    V1.media = V1.media.split(/,\s*/).join(',' + ' ');
    V1.xmedia = V1.media;
    Z._U1.push(V1);
  }
  
  function f11(href, F4) {
    var T2 = {'text': '', 'message': U0};
    f48(async, href, function (L4, M4) {
      if ((typeof M4 == P0 && f42(M4) != '') && !/^(text\/css)/.test(M4)) {
        if (/^(text\/html)/.test(M4)) {
          var C2 = L4.match(/<title>([1-9]{1,3}[^<]+)<\/title>/i);
          if (C2 && C2.length >= 2) {
            T2.message = C2[1];
          }
        }
        if (T2.message == U0) {
          T2.message = F;
        }
      } else {
        T2.text = L4;
      }
      F4(T2);
    }, function (N4) {
      T2.message = N4;
      F4(T2);
    });
  }
  
  function f12(J4) {
    var J6 = [];
    var I4 = /@import\s*(?:url\s*\(\s*[\'\"]?|[\'\"])([^\'\"\)]+)(?:[\'\"]|[\'\"]?\s*\))([^;]*)(;|$)/ig;
    var C2 = J4.match(I4);
    if (C2) {
      for (var i = 0; i < C2.length; i++) {
        var href = f47(C2[i].replace(I4, '$1'), base);
        var media = f42(f42(C2[i].replace(I4, '$2')).replace(/^\)/, ''));
        var V5 = S0;
        if (!media) {
          V5 = T0;
          media = B1;
        }
        J6.push({'href': href, 'media': media, 'V5': V5});
      }
    }
    return J6;
  }
  
  function f13(J4, J6) {
    J4 = J4.replace(/(\/\*([^*]|(\*+([^*/])))*\*+\/)/gm, '');
    if (!Z._N5) {
      J4 = J4.replace(/(<\!\[CDATA\[([^\]]|(\]+([^>])))*\]+>)/gm, '');
    }
    if (Z._N5 && (!(H1 || I1 || J1))) {
      J4 = J4.replace(/(<\!\-\-([^\-]|(\-+([^>])))*\-+>)/gm, '');
    }
    J4 = J4.replace(/[\t]+/g, ' ').replace(/[ ][ ]/g, ' ');
    J4 = J4.replace(/[\r\n]/g, '');
    J4 = J4.replace(/@(charset|namespace)[^;]+;/igm, '');
    if (typeof J6 != N0 && J6 == S0) {
      J4 = J4.replace(/@import[^;]+;/igm, '');
    } else if (/@import[^;]+;/i.test(J4)) {
      var V1 = J4.replace(/(@import[^;]+;)/igm, '{SPLIT}$1{SPLIT}').split('{SPLIT}');
      for (var J4 = '', A3 = U0, i = 0; i < V1.length; i++) {
        if (f42(V1[i]) == '') {
          continue;
        }
        if (/@import[^;]+;/i.test(V1[i])) {
          if (A3 === U0) {
            A3 = T0;
          }
          if (A3 === T0) {
            J4 += V1[i];
          }
        } else {
          A3 = S0;
          J4 += V1[i];
        }
      }
    }
    J4 = J4.replace(/@(font\-face|page)[^\}]+\}/igm, '');
    J4 = J4.replace(/(<\!\-\-)|(\-\->)|(<\!\[CDATA\[)|(\]\]>)/gm, '');
    return f42(J4);
  }
  
  function f14(V1) {
    var T5 = V1.text.match(/(content:[^;]+;)/igm);
    if (T5) {
      for (var g = 0; g < T5.length; g++) {
        V1.text = V1.text.replace(T5[g], '[G' + g + ']');
      }
    }
    V1.text = f42(f13(V1.text, S0)).split('}');
    for (var i = 0; i < V1.text.length; i++) {
      V1.text[i] = f42(V1.text[i]).split('{');
      for (var j = 0; j < V1.text[i].length; j++) {
        V1.text[i][j] = f42(V1.text[i][j]);
      }
    }
    if (T5) {
      for (var g = 0; g < T5.length; g++) {
        for (var i = 0; i < V1.text.length; i++) {
          for (var j = 0; j < V1.text[i].length; j++) {
            V1.text[i][j] = V1.text[i][j].replace('[G' + g + ']', T5[g]);
          }
        }
      }
    }
    var P2 = 0;
    var V2 = V1.media, W2 = V1.xmedia;
    var X2 = V1.owner;
    for (var i = 0; i < V1.text.length; i++) {
      if (V1.text[i].length == 2) {
        Z._S1.push({
          'selector': V1.text[i][0],
          'css': V1.text[i][1],
          'media': V2,
          'xmedia': W2,
          'owner': X2.toLowerCase(),
          'href': V1.href,
          'ssid': V1.ssid
        });
        P2++;
      } else if (V1.text[i].length == 3) {
        V2 = f42(V1.text[i][0].replace('@media', '')).toLowerCase();
        X2 = '@media';
        W2 = V2;
        var I2 = V1.media;
        if (I2 == '') {
          I2 = B1;
        }
        V2 = f28(I2, V2);
        Z._S1.push({
          'selector': V1.text[i][1],
          'css': V1.text[i][2],
          'media': V2,
          'xmedia': W2,
          'owner': X2,
          'href': V1.href,
          'ssid': V1.ssid
        });
        P2++;
      } else if (V1.text[i].length == 1) {
        V2 = V1.media;
        W2 = V1.xmedia;
        X2 = V1.owner;
      }
    }
    return P2;
  }
  
  function f15(F4) {
    var O2 = f44(page.styleSheets);
    for (var i = 0; i < O2.length; i++) {
      O2[i].__ssid = Z.Y4++;
      if (typeof O2[i].ownerNode != N0) {
        if (G1 && /xml\-stylesheet/.test(O2[i].ownerNode.nodeName)) {
          Z._T1.push({
            'ssid': O2[i].__ssid,
            'href': f47(O2[i].href, base),
            'owner': 'xml-stylesheet',
            'media': R,
            'stylesheet': U0,
            'rules': 0,
            'message': V
          });
          O2.splice(i, 1);
          i--;
        } else {
          try {
            f16(O2[i], O2[i].ownerNode.nodeName.toLowerCase(), O2[i].media.length > 0 ? f42(O2[i].media.mediaText) : B1);
          } catch (err) {
            Z._T1.push({
              'ssid': O2[i].__ssid,
              'href': R,
              'owner': R,
              'media': R,
              'stylesheet': U0,
              'rules': 0,
              'message': E
            });
            O2.splice(i, 1);
            i--;
          }
        }
      } else if (typeof O2[i].owningElement != N0) {
        f18(O2[i], O2[i].owningElement.nodeName.toLowerCase(), f42(O2[i].media) != '' ? f42(O2[i].media) : B1);
      }
    }
    Z._T1.sort(function (a, b) {
      return a.ssid - b.ssid;
    });
    Z.Y4 = U0;
    delete Z.Y4;
    if (watch == S0) {
      f31();
    }
    if (typeof F4 == Q0) {
      F4();
    }
  }
  
  function f16(sheet, owner, media) {
    if (sheet.href && sheet.href != base) {
      var C3 = f47(sheet.href, base);
      if (f43(Z._T1, C3, 'href') != U0) {
        Z._T1.push({
          'ssid': sheet.__ssid,
          'href': C3,
          'owner': owner,
          'media': media,
          'stylesheet': U0,
          'rules': 0,
          'message': U
        });
        sheet.disabled = S0;
        return;
      }
    }
    try {
      var Q4 = sheet.disabled;
      if (L1 && Q4 && sheet.media.length > 0) {
        var R4 = sheet.media.mediaText;
        sheet.media.mediaText = Z._Y6;
        Q4 = sheet.disabled;
        sheet.media.mediaText = R4;
      }
      if (!Q4) {
        for (var rules = sheet.cssRules, P2 = 0, i = 0; i < rules.length; i++) {
          if (rules.item(i).type == 1) {
            P2++;
          } else if (rules.item(i).type == 4) {
            for (var B3 = rules.item(i).cssRules, j = 0; j < B3.length; j++) {
              if (B3.item(j).type == 1) {
                P2++;
              }
            }
          }
        }
        var message = S;
      } else {
        P2 = 0;
        message = T;
      }
      Z._T1.push({
        'ssid': sheet.__ssid,
        'href': (sheet.href && sheet.href != base) ? f47(sheet.href, base) : U0,
        'owner': owner,
        'media': media,
        'stylesheet': sheet,
        'rules': P2,
        'message': message
      });
      if (!Q4) {
        f17(sheet, sheet.cssRules, owner, media);
      }
    } catch (err) {
      Z._T1.push({
        'ssid': sheet.__ssid,
        'href': (sheet.href && sheet.href != base) ? f47(sheet.href, base) : U0,
        'owner': owner,
        'media': media,
        'stylesheet': U0,
        'rules': 0,
        'message': D
      });
    }
  }
  
  function f17(sheet, rules, owner, media) {
    for (i = 0; i < rules.length; i++) {
      rule = rules.item(i);
      if (rule.type == 3) {
        media = rule.media.mediaText;
        if (media == '') {
          try {
            media = rule.parentStyleSheet.media.mediaText;
          } catch (err) {
            media = rule.parentStyleSheet.ownerRule.media.mediaText;
          }
        }
        if (media == '') {
          media = B1;
        }
        media = media.toLowerCase();
        var parent = rule.parentStyleSheet;
        while (parent) {
          try {
            var I2 = parent.media.mediaText;
          } catch (err) {
            I2 = parent.ownerRule.media.mediaText;
          }
          if (I2 == '') {
            I2 = B1;
          }
          media = f28(I2, media);
          if ((H1 || I1 || J1) && !parent.parentStyleSheet && parent.ownerRule) {
            parent = parent.ownerRule.parentStyleSheet;
          } else {
            parent = parent.parentStyleSheet;
          }
        }
        rule.styleSheet.__ssid = Z.Y4++;
        f16(rule.styleSheet, '@import', media);
      }
    }
    for (var i = 0; i < rules.length; i++) {
      var rule = rules.item(i);
      if (rule.type == 1) {
        if (/^(xml\-stylesheet|link|(([a-z]+:)?style))$/i.test(owner)) {
          media = rule.parentStyleSheet.media.mediaText;
          if (media == '') {
            media = B1;
          }
          media = media.toLowerCase();
        }
        var J4 = rule.style.cssText.replace(/[\r\n]/g, ' ');
        J4 = J4.split(';');
        for (var c = 0; c < J4.length; c++) {
          J4[c] = J4[c].split(':');
          while (J4[c].length > 2) {
            J4[c][1] += ':' + J4[c].pop();
          }
          if (J4[c].length == 1) {
            J4.splice(c, 1);
            c--;
            continue;
          }
          if (rule.style.getPropertyPriority(f42(J4[c][0])) == 'important' && !L0.test(J4[c][1])) {
            J4[c][1] += ' !important';
          }
          J4[c] = J4[c].join(':');
        }
        J4 = J4.join(';');
        Z._S1.push({
          'selector': rule.selectorText,
          'css': J4,
          'media': media,
          'owner': owner,
          'href': sheet.href == U0 ? U0 : f47(sheet.href, base),
          'ssid': sheet.__ssid
        });
      }
    }
    for (i = 0; i < rules.length; i++) {
      rule = rules.item(i);
      if (rule.type == 4) {
        media = rule.media.mediaText;
        if (media == '') {
          media = rule.parentStyleSheet.media.mediaText;
        }
        if (media == '') {
          media = B1;
        }
        media = media.toLowerCase();
        var parent = rule.parentStyleSheet;
        while (parent) {
          try {
            var I2 = parent.media.mediaText;
          } catch (err) {
            I2 = parent.ownerRule.media.mediaText;
          }
          if (I2 == '') {
            I2 = B1;
          }
          media = f28(I2, media);
          if ((H1 || I1 || J1) && !parent.parentStyleSheet && parent.ownerRule) {
            parent = parent.ownerRule.parentStyleSheet;
          } else {
            parent = parent.parentStyleSheet;
          }
        }
        f17(sheet, rule.cssRules, '@media', media);
      }
    }
  }
  
  function f18(sheet, owner, media, href) {
    if (sheet.href) {
      var C3 = f47(sheet.href, base);
      if (f43(Z._T1, C3, 'href') != U0) {
        Z._T1.push({
          'ssid': sheet.__ssid,
          'href': C3,
          'owner': owner,
          'media': media,
          'stylesheet': U0,
          'rules': 0,
          'message': U
        });
        sheet.disabled = S0;
        return;
      }
    }
    var J6 = [];
    var Q4 = sheet.disabled;
    if (!Q4) {
      for (var i = 0; i < sheet.imports.length; i++) {
        if (sheet.imports[i].rules.length == 0) {
          continue;
        }
        media = f42(sheet.media);
        if (media == '') {
          media = B1;
        }
        var U4 = f47(sheet.imports[i].href, base);
        J6.push({'sheet': sheet.imports[i], 'owner': '@import', 'media': media, 'href': U4});
      }
    }
    if (J6.length > 0) {
      for (var i = 0; i < J6.length; i++) {
        J6[i].sheet.__ssid = Z.Y4++;
        f18(J6[i].sheet, J6[i].owner, J6[i].media, J6[i].href);
      }
    }
    try {
      if (!Q4) {
        var J4 = sheet.cssText;
        J4 = J4.replace(/@(import|charset|namespace)[^;]+;/igm, '');
        J4 = J4.replace(/@(font\-face|page)[^\}]+\}/igm, '');
        var T5 = J4.match(/(content\s*:\s*[\'\"].*(;|$))/igm);
        if (T5) {
          for (var g = 0; g < T5.length; g++) {
            J4 = J4.replace(T5[g], '[G' + g + ']');
          }
        }
        J4 = f42(J4).split('}');
        for (var i = 0; i < J4.length; i++) {
          J4[i] = f42(J4[i]).split('{');
          for (var j = 0; j < J4[i].length; j++) {
            J4[i][j] = f42(J4[i][j]);
          }
        }
        if (T5) {
          for (var g = 0; g < T5.length; g++) {
            for (var i = 0; i < J4.length; i++) {
              for (var j = 0; j < J4[i].length; j++) {
                J4[i][j] = J4[i][j].replace('[G' + g + ']', T5[g]);
              }
            }
          }
        }
        if (typeof href == N0) {
          href = (sheet.href == U0 || sheet.href == '') ? U0 : f47(sheet.href, base);
        }
        var rules = [];
        var V2 = sheet.media;
        if (V2 == '') {
          V2 = B1;
        }
        var X2 = owner;
        for (var i = 0; i < J4.length; i++) {
          if (J4[i].length == 2) {
            rules.push({
              'selector': J4[i][0],
              'css': J4[i][1],
              'media': V2,
              'owner': X2,
              'href': href,
              'ssid': sheet.__ssid
            });
          } else if (J4[i].length == 3) {
            V2 = f42(J4[i][0].replace('@media', '')).toLowerCase();
            X2 = '@media';
            var I2 = sheet.media;
            if (I2 == '') {
              I2 = B1;
            }
            V2 = f28(I2, V2);
            rules.push({
              'selector': J4[i][1],
              'css': J4[i][2],
              'media': V2,
              'owner': X2,
              'href': href,
              'ssid': sheet.__ssid
            });
          } else if (J4[i].length == 1) {
            V2 = sheet.media;
            if (V2 == '') {
              V2 = B1;
            }
            X2 = owner;
          }
        }
        var message = S;
      } else {
        message = T;
      }
      if (!Q4) {
        var P2 = f19(rules);
      }
      Z._T1.push({
        'ssid': sheet.__ssid,
        'href': sheet.href ? f47(sheet.href, base) : U0,
        'owner': owner,
        'media': media,
        'stylesheet': sheet,
        'rules': !Q4 ? P2 : 0,
        'message': message
      });
    } catch (err) {
      Z._T1.push({
        'ssid': sheet.__ssid,
        'href': sheet.href ? f47(sheet.href, base) : U0,
        'owner': owner,
        'media': media,
        'stylesheet': U0,
        'rules': 0,
        'message': D
      });
    }
  }
  
  function f19(rules) {
    var P2 = 0;
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].selector == '' || rules[i].selector == 'UNKNOWN' || rules[i].selector.indexOf(':unknown') != -1) {
        continue;
      }
      Z._S1.push({
        'selector': f24(rules[i].selector),
        'css': f25(rules[i].css),
        'media': rules[i].media,
        'owner': rules[i].owner,
        'href': rules[i].href,
        'ssid': rules[i].ssid
      });
      P2++;
    }
    return P2;
  }
  
  function f20(D5, media, F5, S5, rules, B2, F2) {
    F5 = f39(F5);
    if (typeof rules == N0 || rules == U0) {
      rules = [];
    }
    if (typeof B2 == N0 || B2 == U0) {
      B2 = T0;
    }
    if (typeof F2 == N0 || F2 == U0) {
      F2 = [D5];
      if (attributes == S0 && D5.getAttribute('style')) {
        var M5 = f21(D5);
        if (M5 != U0) {
          Z._S1.push(M5);
        }
      }
    } else {
      F2.push(D5);
    }
    for (var i = 0; i < Z._S1.length; i++) {
      if (!f29(media, Z._S1[i])) {
        continue;
      }
      if (Z._S1[i].owner == '@style' && D5 == F2[0]) {
        var D4 = [D5], altstate = T0;
      } else {
        if (S5 == S0) {
          for (var altstate = S0, E2 = f33(Z._S1[i].selector), j = 0; j < E2.length; j++) {
            if (E2[j] == D5) {
              altstate = T0;
              break;
            }
          }
        } else {
          altstate = T0;
        }
        D4 = f33(S5 == S0 ? Z._S1[i].selector.replace(H0, '') : Z._S1[i].selector);
      }
      if (D4.length > 0) {
        for (var j = 0; j < D4.length; j++) {
          if (D4[j] == D5) {
            var inheritance = [];
            if (B2) {
              for (var a = F2.length - 1; a > 0; a--) {
                inheritance.push(F2[a]);
              }
            }
            var X1 = {
              'selector': Z._S1[i].selector,
              'css': Z._S1[i].css,
              'index': i,
              'specificity': [0, 0, 0, 0],
              'inheritance': inheritance,
              'altstate': altstate
            };
            for (var G2 = ['media', 'xmedia', 'owner', 'ssid', 'href'], k = 0; k < G2.length; k++) {
              if (F5 == '*' || typeof F5[G2[k]] != N0) {
                if (typeof Z._S1[i][G2[k]] != N0) {
                  X1[G2[k]] = Z._S1[i][G2[k]];
                }
              }
            }
            rules.push(X1);
            break;
          }
        }
      }
    }
    if (D5.parentNode && D5.parentNode.nodeType == 1) {
      return f20(D5.parentNode, media, F5, S5, rules, S0, F2);
    } else {
      if (rules.length == 0) {
        return rules;
      }
      for (var i = 0; i < rules.length; i++) {
        var K4 = rules[i].selector.split(',');
        for (var L2 = [], j = 0; j < K4.length; j++) {
          L2.push(rules[i].inheritance.length > 0 ? [0, 0, 0, 0] : f23(K4[j]));
        }
        L2.sort(function (a, b) {
          if (a[0] !== b[0]) {
            return b[0] - a[0];
          }
          if (a[1] !== b[1]) {
            return b[1] - a[1];
          }
          if (a[2] !== b[2]) {
            return b[2] - a[2];
          }
          return b[3] - a[3];
        });
        rules[i].specificity = L2[0];
      }
      rules.sort(function (a, b) {
        if (a.specificity.toString() === b.specificity.toString()) {
          if (a.index === b.index) {
            return b.inheritance.length - a.inheritance.length;
          }
          return a.index - b.index;
        }
        if (a.specificity[0] !== b.specificity[0]) {
          return a.specificity[0] - b.specificity[0];
        }
        if (a.specificity[1] !== b.specificity[1]) {
          return a.specificity[1] - b.specificity[1];
        }
        if (a.specificity[2] !== b.specificity[2]) {
          return a.specificity[2] - b.specificity[2];
        }
        return a.specificity[3] - b.specificity[3];
      });
      if (F5 === "*" || typeof F5.properties != N0) {
        rules = f22(rules, S0);
      }
      if (F5 !== "*") {
        for (var i = 0; i < rules.length; i++) {
          for (var D3 = ['selector', 'css', 'index', 'specificity', 'inheritance', 'altstate'], j = 0; j < D3.length; j++) {
            if (typeof F5[D3[j]] == N0) {
              rules[i][D3[j]] = U0;
              delete rules[i][D3[j]];
            }
          }
        }
      }
      if (Z._S1[Z._S1.length - 1].owner == '@style') {
        Z._S1.splice(Z._S1.length - 1, 1);
      }
      return rules;
    }
  }
  
  function f21(D5) {
    if (K1) {
      try {
        var C2 = D5.outerHTML.split('>')[0].match(/.*style\s*=\s*\"([^\"]*)\".*/im);
        var J4 = C2 ? f25(C2[1]) : '';
      } catch (err) {
        J4 = '';
      }
    } else {
      J4 = D5.getAttribute('style');
    }
    if (J4 == '') {
      return U0;
    }
    var X1 = {'selector': '', 'css': J4, 'media': B1, 'owner': '@style', 'href': U0, 'ssid': Infinity};
    if (mode == W0) {
      X1.xmedia = X1.media;
    }
    return X1;
  }
  
  function f22(rules, U5) {
    for (var i = 0; i < rules.length; i++) {
      rules[i].properties = f27(rules[i].css, {}, (typeof rules[i].inheritance != N0 && rules[i].inheritance.length > 0));
      rules[i].T6 = {};
      for (var j in rules[i].properties) {
        rules[i].T6[j] = {'value': rules[i].properties[j].property, 'status': X0};
      }
      if (U5) {
        if (rules[i].altstate == S0) {
          for (var ip in rules[i].T6) {
            if (!rules[i].T6.hasOwnProperty(ip)) {
              continue;
            }
            rules[i].T6[ip].status = A1;
          }
        } else {
          for (var j = 0; j < i; j++) {
            for (var jp in rules[j].T6) {
              if (!rules[j].T6.hasOwnProperty(jp) || rules[j].T6[jp].status != X0) {
                continue;
              }
              for (var ip in rules[i].T6) {
                if (!rules[i].T6.hasOwnProperty(ip) || rules[i].T6[ip].status != X0) {
                  continue;
                }
                if (jp == ip) {
                  rules[j].T6[jp].status = Y0;
                  break;
                }
              }
            }
          }
        }
      }
    }
    if (U5) {
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].inheritance.length > 0) {
          continue;
        }
        for (var j in rules[i].T6) {
          if (!rules[i].T6.hasOwnProperty(j) || rules[i].T6[j].status != Y0) {
            continue;
          }
          if (L0.test(rules[i].T6[j].value)) {
            var E3 = i;
            for (var x = i + 1; x < rules.length; x++) {
              if (typeof rules[x].T6[j] != N0 && rules[x].T6[j].status == Y0 && L0.test(rules[x].T6[j].value)) {
                E3 = x;
              }
            }
            for (var x = i; x < rules.length; x++) {
              if (x == E3) {
                rules[x].T6[j].status = X0;
                for (var y = 0; y < x; y++) {
                  if (typeof rules[y].T6[j] != N0 && rules[y].T6[j].status == X0) {
                    rules[y].T6[j].status = Y0;
                  }
                }
              } else {
                if (typeof rules[x].T6[j] != N0 && rules[x].T6[j].status == X0) {
                  rules[x].T6[j].status = Y0;
                  break;
                }
              }
            }
          }
        }
      }
      for (var i = 0; i < rules.length; i++) {
        for (var j in rules[i].T6) {
          if (!rules[i].T6.hasOwnProperty(j) || rules[i].T6[j].status != X0) {
            continue;
          }
          if (typeof D0[j] != N0) {
            for (var x = 0; x <= i; x++) {
              for (var p = 0; p < D0[j].length; p++) {
                var R1 = D0[j][p];
                if (typeof rules[x].T6[R1] != N0 && rules[x].T6[R1].status == X0) {
                  if (x == i) {
                    var n = 0;
                    for (var q in rules[x].T6) {
                      if (!rules[x].T6.hasOwnProperty(q)) {
                        continue;
                      }
                      if (q == j) {
                        var C7 = n;
                      }
                      if (q == R1) {
                        var D7 = n;
                      }
                      n++;
                    }
                  }
                  if ((x < i || D7 < C7) && !L0.test(rules[x].T6[R1].value)) {
                    rules[x].T6[R1].status = Y0;
                  }
                }
              }
            }
          }
        }
      }
    }
    for (var i = 0; i < rules.length; i++) {
      for (var j in rules[i]) {
        if (!rules[i].hasOwnProperty(j)) {
          continue;
        }
        if ((j == 'properties' || j == 'T6') && f46(rules[i][j]) == 0) {
          rules[i][j] = U0;
        }
      }
      rules[i].properties = rules[i].T6;
      delete rules[i].T6;
      if (!U5) {
        for (var k in rules[i].properties) {
          if (!rules[i].properties.hasOwnProperty(k)) {
            continue;
          }
          rules[i].properties[k] = rules[i].properties[k].value;
        }
      }
    }
    return rules;
  }
  
  function f23(selector) {
    var G3 = [0, 0, 0, 0];
    if (selector === '') {
      G3[0] += 1;
      return G3;
    }
    var F3 = selector.replace(I0, '');
    var C2 = F3.match(J0);
    if (C2) {
      G3[1] += C2.length;
    }
    var C2 = F3.match(K0);
    if (C2) {
      G3[2] += C2.length;
    }
    C2 = selector.match(I0);
    if (C2) {
      G3[2] += C2.length;
    }
    var C2 = F3.match(H0);
    if (C2) {
      G3[2] += C2.length;
    }
    var H3 = F3.replace(H0, '').replace(G0, '').replace(/(:not)/ig, '').replace(/(^|\()([_a-z0-9-\.\\]+\|)/ig, '$1').replace(J0, '').replace(K0, '');
    var C2 = H3.match(/([_a-z0-9-:\\]+)/ig);
    if (C2) {
      G3[3] += C2.length;
    }
    var C2 = F3.match(G0);
    if (C2) {
      G3[3] += C2.length;
    }
    return G3;
  }
  
  function f24(Q3) {
    var Q1 = Q3.match(/(^|[^\(])(\[[^\]]+\])($|[^\)])/ig);
    if (Q1) {
      for (var a = 0; a < Q1.length; a++) {
        if (Q1[a].charAt(0) != '[') {
          Q1[a] = Q1[a].substr(1, Q1[a].length - 1);
        }
        if (Q1[a].charAt(Q1[a].length - 1) != ']') {
          Q1[a] = Q1[a].substr(0, Q1[a].length - 1);
        }
        Q3 = Q3.replace(Q1[a], '{a' + a + '}');
      }
    }
    var P3 = Q3.match(/([#\.][a-z]+[_a-z0-9-:\\]*)/ig);
    if (P3) {
      for (var c = 0; c < P3.length; c++) {
        Q3 = Q3.replace(P3[c], '{c' + c + '}');
      }
    }
    Q3 = Q3.replace(/([A-Z1-6]+)/g, function (a) {
      return a.toLowerCase();
    });
    if (Q1) {
      for (a = 0; a < Q1.length; a++) {
        Q3 = Q3.replace('{a' + a + '}', Q1[a]);
      }
    }
    if (P3) {
      for (c = 0; c < P3.length; c++) {
        Q3 = Q3.replace('{c' + c + '}', P3[c]);
      }
    }
    return Q3;
  }
  
  function f25(J4) {
    J4 = J4.split(';');
    for (var j = 0; j < J4.length; j++) {
      var C2 = J4[j].split(':');
      while (C2.length > 2) {
        C2[1] += ':' + C2.pop();
      }
      if (C2.length == 1) {
        J4.splice(j, 1);
        j--;
        continue;
      }
      C2[0] = f42(C2[0]).toLowerCase();
      C2[1] = f42(C2[1]);
      J4[j] = C2[0] + ':' + C2[1];
    }
    return J4.join(';' + ' ');
  }
  
  function f26(Q3) {
    var K4 = [];
    if (Q3 == '') {
      return K4;
    }
    Q3 = Q3.split(',');
    for (var j = 0; j < Q3.length; j++) {
      K4.push(f42(Q3[j]));
    }
    return K4;
  }
  
  function f27(J4, properties, B2) {
    if (J4 == '') {
      return properties;
    }
    J4 = J4.replace(/[\r\n]/gm, '');
    J4 = J4.split(';');
    for (var i = 0; i < J4.length; i++) {
      J4[i] = f42(J4[i]);
      if (J4[i] == '') {
        continue;
      }
      var C2 = J4[i].split(':');
      while (C2.length > 2) {
        C2[1] += ':' + C2.pop();
      }
      if (C2.length == 1) {
        continue;
      }
      var O3 = f42(C2[0]);
      if (!B2 || (B2 && typeof C0[O3] != N0)) {
        if (typeof properties[O3] == N0 || !L0.test(properties[O3].property) || properties[O3].B2 == S0 || L0.test(C2[1])) {
          properties[O3] = {'property': f42(C2[1]), 'B2': B2};
        }
      }
    }
    return properties;
  }
  
  function f28(I2, W3) {
    var H2 = f45(I2, ',');
    var X3 = /([ \t]and.*$)/i, C2 = W3.match(X3), V3 = (C2 ? C2[0] : '');
    W3 = W3.replace(X3, '').replace(/only[ \t]+/i, '');
    if (typeof H2['all'] != N0) {
      return W3 + V3;
    }
    W3 = W3.split(',');
    for (var i = 0; i < W3.length; i++) {
      W3[i] = f42(W3[i]);
    }
    for (var i = 0; i < W3.length; i++) {
      if (W3[i] == B1) {
        for (var m in H2) {
          if (!H2.hasOwnProperty(m)) {
            continue;
          }
          if (f43(W3, m) == U0 && !/[\(\)]/.test(m)) {
            W3.push(m);
          }
        }
      }
      if (typeof H2[W3[i]] == N0) {
        W3.splice(i, 1);
        i--;
      }
    }
    if (W3.length == 0) {
      W3.push(D1);
    }
    return W3.join(',' + ' ') + V3;
  }
  
  function f29(media, rule) {
    var D2 = f45(rule.media, ',');
    var C2 = T0;
    for (var j = 0; j < media.length; j++) {
      if (typeof D2[media[j]] != N0 || (typeof D2[D1] == N0 && media[j] == B1) || (typeof D2[B1] != N0) && media[j] != D1) {
        C2 = S0;
        break;
      }
    }
    return C2;
  }
  
  function f30() {
    var A7 = C1;
    try {
      var B7 = page.getElementsByTagName('body').item(0);
      var X6 = B7.insertBefore(page.createElement('span'), B7.firstChild);
      X6.id = 'cssutilitiestest' + 'medianode';
      X6.style.display = 'inline';
      var D2 = F1.split(',');
      D2.splice(0, 0, 'fake');
      if (K1) {
        var W6 = page.createStyleSheet();
        W6.addRule('#cssutilitiestest' + 'medianode', 'display:block !important;');
      } else {
        var V6 = page.getElementsByTagName('head').item(0).appendChild(page.createElement('style'));
        V6.setAttribute('type', 'text/css');
        V6.appendChild(page.createTextNode('#cssutilitiestest' + 'medianode{display:block !important;}'));
        var W6 = page.styleSheets[page.styleSheets.length - 1];
      }
      for (var i = 0; i < D2.length; i++) {
        if (K1) {
          W6.media = D2[i];
        } else {
          W6.media.mediaText = D2[i];
        }
        if ((K1 && X6.currentStyle.display == 'block') || (!K1 && page.defaultView.getComputedStyle(X6, '').getPropertyValue('display') == 'block')) {
          A7 = D2[i];
          break;
        }
      }
      X6.parentNode.removeChild(X6);
      if (K1) {
        V6 = W6.owningElement;
      }
      V6.parentNode.removeChild(V6);
    } catch (err) {
      A7 = C1;
    }
    if (A7 == 'fake') {
      A7 = C1;
    }
    return A7;
  }
  
  function f31() {
    for (var U3 = [], i = 0; i < Z._T1.length; i++) {
      var stylesheet = mode == W0 ? (Z._T1[i].stylenode == T0 || Z._T1[i].stylenode == U0) ? U0 : (H1 || I1 || J1) ? Z._T1[i].stylenode : Z._T1[i].stylenode[typeof Z._T1[i].stylenode.styleSheet != N0 ? 'styleSheet' : 'sheet'] : Z._T1[i].stylesheet;
      if (stylesheet == U0) {
        continue;
      }
      U3.push({'stylesheet': stylesheet, 'disabled': stylesheet.disabled});
    }
    if ((H1 || I1 || J1) && mode == V0) {
      function f32() {
        for (var S3 = [], T3 = page.styleSheets, i = 0; i < T3.length; i++) {
          if (typeof T3[i].ownerNode.__R3 == N0) {
            T3[i].ownerNode.__R3 = new Date().getTime() + '' + Math.round(Math.random() * 10000);
          }
          S3.push(T3[i].ownerNode.__R3);
        }
        return S3;
      }
      
      var K2 = f32(), J2 = window.setInterval(function () {
        var currentS3 = f32();
        if (K2.join() != currentS3.join()) {
          window.clearInterval(J2);
          Z.init(typeof Z.W1 != N0 ? Z.W1 : U0);
        }
      }, M1);
    } else {
      var J2 = window.setInterval(function () {
        for (var i = 0; i < U3.length; i++) {
          if (U3[i].stylesheet.disabled != U3[i].disabled) {
            window.clearInterval(J2);
            Z.init(typeof Z.W1 != N0 ? Z.W1 : U0);
            var W4 = S0;
          }
          if (typeof W4 != N0) {
            break;
          }
        }
      }, M1);
    }
  }
  
  function f33(selector) {
    if (F0.test(selector)) {
      var K4 = selector.split(',');
      for (var i = 0; i < K4.length; i++) {
        if (F0.test(K4[i])) {
          K4.splice(i, 1);
          i--;
        }
      }
      selector = K4.join(',');
    }
    if (f42(selector) == '') {
      return [];
    }
    if (api == T0) {
      try {
        return page.querySelectorAll(selector);
      } catch (err) {
        return [];
      }
    }
    if (typeof qsa == Q0) {
      try {
        return qsa(selector, page);
      } catch (err) {
        return [];
      }
    }
    try {
      if (typeof Selector != Q0) {
        throw(new Error(N));
      }
      var r = Selector(selector, page);
      return typeof r == N0 ? [] : r;
    } catch (err) {
      if (err.message == N) {
        throw(err);
      }
      return [];
    }
  }
  
  function f34(tagname) {
    try {
      var B4 = f44(Z._N5 ? page.getElementsByTagNameNS('*', tagname) : page.getElementsByTagName(tagname));
    } catch (err) {
      B4 = [];
    }
    if (tagname == '*') {
      for (var i = 0; i < B4.length; i++) {
        if (B4[i].nodeType != 1 || B4[i].tagName.charAt(0) == '/') {
          B4.splice(i--, 1);
        }
      }
    }
    return B4;
  }
  
  function f35() {
    if (typeof Z._S1 == N0) {
      Z.init();
    }
  }
  
  function f36(O1, N3) {
    N3.push('M6');
    for (var P1 = {}, i = 0; i < N3.length; i++) {
      if (typeof O1[i] == Q0) {
        for (var j = i; j < N3.length; j++) {
          P1[N3[j]] = U0;
        }
        P1.M6 = O1[i];
        break;
      } else if (typeof O1[i] == N0) {
        P1[N3[i]] = U0;
      } else {
        P1[N3[i]] = O1[i];
      }
    }
    return P1;
  }
  
  function f37(Y1, E5) {
    if (typeof Y1 == P0 && Y1.charAt(0) == '#') {
      Y1 = page.getElementById(Y1.substr(1, Y1.length - 1));
    }
    if (typeof Y1 == N0 || Y1 == U0 || typeof Y1.nodeType == N0 || Y1.nodeType != 1) {
      throw(new Error(W.replace('%method', E5)));
    }
    return Y1;
  }
  
  function f38(C5) {
    if (typeof C5 == N0 || C5 == '' || C5 == U0) {
      C5 = C1;
    }
    if (/(^|,)\*(,|$)/.test(C5)) {
      C5 = 'all,none';
    }
    C5 = C5.split(',');
    for (var i = 0; i < C5.length; i++) {
      C5[i] = f42(C5[i]);
      if (C5[i] == E1) {
        C5[i] = Z._Y6;
      }
    }
    return C5;
  }
  
  function f39(A2) {
    if (typeof A2 == N0 || A2 == '' || A2 == U0 || A2 == 'null') {
      A2 = '*';
    } else if (typeof A2 == P0) {
      A2 = f42(A2);
      if (A2 !== '*') {
        if (/(,\s*\*|\*\s*,)/.test(A2)) {
          A2 = '*';
        } else {
          A2 = f45(A2, ',');
        }
      }
    }
    return A2;
  }
  
  function f40(L6) {
    if (typeof L6 != Q0) {
      L6 = U0;
    }
    return L6;
  }
  
  function f42(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
  
  function f43(R5, M3, O3) {
    for (var i = 0; i < R5.length; i++) {
      if (typeof O3 != N0 && typeof R5[i] == O0) {
        if (R5[i][O3] == M3) {
          return R5[i];
        }
      } else if (R5[i] == M3) {
        return R5[i];
      }
    }
    return U0;
  }
  
  function f44(U6) {
    for (var R5 = [], i = 0; i < U6.length; i++) {
      R5.push(U6[i]);
    }
    return R5;
  }
  
  function f45(str, L3) {
    var obj = {};
    str = str.split(L3);
    var tmp = str[str.length - 1];
    if (/[ \t]and/i.test(tmp)) {
      tmp = tmp.split(/[ \t]and/i);
      str.splice(str.length - 1, 1);
      for (var i = 0; i < tmp.length; i++) {
        str.push(tmp[i]);
      }
    }
    for (var i = 0; i < str.length; i++) {
      obj[f42(str[i])] = '';
    }
    return obj;
  }
  
  function f46(obj) {
    var n = 0;
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }
      n++;
    }
    return n;
  }
  
  function f47(href, I2) {
    if (typeof href == N0) {
      return '';
    }
    var K3 = I2.replace('/' + '/', '/').split('/');
    var loc = {'protocol': K3[0], 'host': K3[1]};
    K3.splice(0, 2);
    loc.pathname = '/' + K3.join('/');
    var uri = loc.protocol + '/' + '/' + loc.host;
    if (/^(\.\/)([^\/]?)/.test(href)) {
      href = href.replace(/^(\.\/)([^\/]?)/, '$2');
    }
    if (/(^([a-z]+)\:\/\/)/.test(href)) {
      uri = href;
    } else if (href.substr(0, 1) == '/') {
      uri += href;
    } else if (/^((\.\.\/)+)([^\/].*$)/.test(href)) {
      var I3 = href.match(/^((\.\.\/)+)([^\/].*$)/);
      I3 = I3[I3.length - 1];
      var J3 = href.split('../').length - 1;
      var K3 = loc.pathname.split('/');
      K3 = K3.splice(0, K3.length - 1);
      for (var i = 0; i < J3; i++) {
        K3 = K3.splice(0, K3.length - 1);
      }
      var path = '';
      for (i = 0; i < K3.length; i++) {
        if (K3[i] != '') {
          path += '/' + K3[i];
        }
      }
      path += '/';
      path += I3;
      uri += path;
    } else {
      path = '';
      K3 = loc.pathname.split('/');
      K3 = K3.splice(0, K3.length - 1);
      for (var i = 0; i < K3.length; i++) {
        if (K3[i] != '') {
          path += '/' + K3[i];
        }
      }
      path += '/';
      uri += path + href;
    }
    return uri;
  }
  
  function f48(async, uri, F4, G4) {
    var W5 = U0;
    if (typeof window.ActiveXObject != N0) {
      try {
        W5 = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (err) {
        W5 = U0;
      }
    }
    if (W5 == U0 && typeof window.XMLHttpRequest != N0) {
      try {
        W5 = new XMLHttpRequest();
      } catch (err) {
        W5 = U0;
      }
    }
    if (W5 == U0) {
      throw(new Error(Q));
    }
    W5.open('GET', uri, async);
    try {
      W5.setRequestHeader('User-Agent', M0);
    } catch (err) {
    }
    function f49(W5) {
      if (/(0|200|304)/.test(W5.status.toString())) {
        F4(W5.responseText, W5.getResponseHeader('Content-Type'));
      } else {
        G4(f42(W5.statusText), W5.status);
      }
    }
    
    if (async == S0) {
      W5.onreadystatechange = function () {
        if (W5.readyState == 4) {
          f49(W5);
        }
      };
      try {
        W5.send(U0);
      } catch (err) {
        G4(B);
      }
    } else {
      var S6;
      try {
        W5.send(U0);
        S6 = S0;
      } catch (err) {
        S6 = T0;
      }
      if (S6 === S0) {
        f49(W5);
      } else {
        G4(B);
      }
    }
  }
}).apply(CSSUtilities);
window.CSSUtilities = CSSUtilities;

new function () {
  function Selector(p, c) {
    if (!(this instanceof Selector))return new Selector(p).exec(c);
    if (!qsa)this.exec = cache[p] || (cache[p] = new compile(p));
    this.pattern = p;
  }
  
  Selector.prototype = {
    constructor: Selector, exec: function (c) {
      var pe = this.patchElement, pa = this.patchArray, p = this.pattern, r = pe ? map.call((c || d).querySelectorAll(p), pe, this) : Array.prototype.slice.call((c || d).querySelectorAll(p));
      return pa ? pa.call(this, r) : r;
    }, toString: function () {
      return this.pattern;
    }, toSource: function () {
      return 'new Selector("' + this.pattern + '")';
    }
  };
  window.Selector = Selector;
  function $(s) {
    var a = arguments;
    return s.replace(/\$(\d)/g, function (m, i) {
      return a[i]
    });
  }
  
  with (navigator.userAgent) {
    var ie = indexOf('MSIE') != -1 && indexOf('Opera') == -1, mz = indexOf('Gecko') != -1 && indexOf('KHTML') == -1, wk = indexOf('AppleWebKit') != -1;
  }
  var d = document, de = d.documentElement, qsa = !!d.querySelectorAll, bcn = !!d.getElementsByClassName, cnl = !!de.children, cnlt = cnl && de.children.tags && !wk, ec = !!de.contains, cdp = !!de.compareDocumentPosition, si = typeof de.sourceIndex == 'number', cache = {}, cmp = {
    '=': 'if($1($2=="$3")){$5}',
    '^=': 'if($1((x=$2)&&!x.indexOf("$3"))){$5}',
    '*=': 'if($1((x=$2)&&x.indexOf("$3")!=-1)){$5}',
    '$=': 'if($1((x=$2)&&x.indexOf("$3",x.length-$4)!=-1)){$5}',
    '~=': 'if($1((x=$2)&&(y=x.indexOf("$3"))!=-1&&(x.charCodeAt(y-1)||32)==32&&(x.charCodeAt(y+$4)||32)==32)){$5}',
    '|=': 'if($1((x=$2)&&(x=="$3"||!x.indexOf("$3-")))){$5}'
  }, map = Array.prototype.map || function (fn, tp) {
      var i = this.length, r = new Array(i);
      while (--i >= 0)r[i] = fn.call(tp, this[i], i, this);
      return r;
    };
  with (d.implementation) {
    var me = d.addEventListener && (hasFeature('MutationEvents', '2.0') || hasFeature('Events', '2.0') && hasFeature('Core', '2.0'));
  }
  Selector.guid = 0;
  Selector.nthIndex = function (LLi, c, r, tp, tv) {
    var p = c.parentNode, ci = 'LLi#' + tv, pl = 'LLi$' + tv;
    if (!p)return Number.NaN;
    if (!c[ci] || c.LLi != LLi) {
      for (var n = p.firstChild, i = 0; n; n = n.nextSibling) {
        if (n[tp] == tv) {
          n[ci] = ++i;
          n.LLi = LLi;
        }
      }
      p[pl] = i;
    }
    return r ? 1 + p[pl] - c[ci] : c[ci];
  };
  if (me) {
    function fn(e) {
      with (e.target) {
        if (nodeType !== 2)
          ownerDocument.LLi = ++Selector.guid;
      }
    }
    
    d.addEventListener('DOMNodeInserted', fn, false);
    d.addEventListener('DOMNodeRemoved', fn, false);
  }
  if (ie) {
    var am = {
      acceptcharset: 'acceptCharset',
      accesskey: 'accessKey',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      checked: 'defaultChecked',
      selected: 'defaultSelected',
      'class': 'className',
      colspan: 'colSpan',
      'for': 'htmlFor',
      frameborder: 'frameBorder',
      hspace: 'hSpace',
      longdesc: 'longDesc',
      marginwidth: 'marginWidth',
      marginheight: 'marginHeight',
      noresize: 'noResize',
      noshade: 'noShade',
      maxlength: 'maxLength',
      readonly: 'readOnly',
      rowspan: 'rowSpan',
      tabindex: 'tabIndex',
      usemap: 'useMap',
      valign: 'vAlign',
      vspace: 'vSpace'
    }, ab = {
      compact: 1,
      nowrap: 1,
      ismap: 1,
      declare: 1,
      noshade: 1,
      checked: 1,
      disabled: 1,
      readonly: 1,
      multiple: 1,
      selected: 1,
      noresize: 1,
      defer: 1
    };
  }
  function compile(qp) {
    this.dup = this.srt = this.idx = this.i = this.nqp = 0;
    with (this) {
      var js = '';
      do {
        i = nqp = 0;
        js += $('n=c;$1q:do{$2}while(false);', srt ? 's=0;' : '', type(qp, $(srt ? 'for(x=r.length;s<x;z=s+((x-s)/2)|0,($1)?s=z+1:x=z);if(s<r.length)r.splice(s++,0,$2);else r[s++]=$2;' : 'r[s++]=$2;', cdp ? 'r[z].compareDocumentPosition(n)&4' : 'h[r[z].LLn]<h[n.LLn]', 'pe?pe.call(this,n):n'), 0, '*'));
      } while (qp = nqp);
      js = $('var r=[],s=0,n,x,y,z,d=c?c.ownerDocument||c.document||c:c=document,pe=this.patchElement,pa=this.patchArray$1$2;$3return pa?pa.call(this,r):r;', dup > 0 ? ',h={}' : '', idx ? me ? ',LLi=d.LLi||(d.LLi=++Selector.guid)' : ',LLi=++Selector.guid' : '', js);
      return new Function('c', js);
    }
  }
  
  compile.prototype = {
    type: function (qp, js, n, s, c) {
      with (this) {
        var m = /^\s*([\w-]+|\*)?(.*)/.exec(qp), t = m[1] || '*';
        if (!n && c == ' ' && !dup)dup = 1;
        js = pred(m[2], js, n, t, c);
        switch (c) {
          case'>':
            return cnlt && t != '*' ? $('for(var n$1=n.children.tags("$2"),i$1=0;n=n$1[i$1++];){$3}', ++i, t, js) : $(cnl ? 'for(var n$1=n.children,i$1=0;n=n$1[i$1++];)$2{$3}' : 'for(n=n.firstChild;n;n=n.nextSibling)$2{$3}', ++i, t != '*' ? 'if(n.nodeName==="' + t.toUpperCase() + '")' : !cnl || ie ? 'if(n.nodeType===1)' : '', js);
          case'+':
            return $('while(n=n.nextSibling)if(n.node$1){$2break}else if(n.nodeType===1)break;', t == '*' ? 'Type===1' : 'Name==="' + t.toUpperCase() + '"', js);
          case'~':
            return $('while(n=n.nextSibling)if(n.node$1){$3}else if(n.node$2)break;', t == '*' ? 'Type===1' : 'Name==="' + t.toUpperCase() + '"', s == '*' ? 'Type===1' : 'Name==="' + s.toUpperCase() + '"', js);
          default:
            return (typeof js == 'object') ? String(js) : n ? t == '*' ? js : $('if(n.nodeName!="$1"){$2}', t.toUpperCase(), js) : $('for(var n$1=n.getElementsByTagName("$2"),i$1=0;n=n$1[i$1++];)$3{$4}', ++i, t, ie && t == '*' ? 'if(n.nodeType===1)' : '', js);
        }
      }
    }, pred: function (qp, js, n, t, c) {
      with (this) {
        var m = /^([#\.])([\w-]+)(.*)/.exec(qp) || /^(\[)\s*([\w-]+)\s*(?:([~|^$*]?=)\s*(?:(['"])(.*?)\4|([\w-]+)))?\s*\](.*)/.exec(qp) || /^:(first|last|only)-(?:(child)|of-type)(.*)/.exec(qp) || /^:(nth)-(?:(last)-)?(?:(child)|of-type)\(\s*(?:(odd|even)|(-|\d*)n([+-]\d+)?|([1-9]\d*))\s*\)(.*)/.exec(qp) || /^:(active|checked|(?:dis|en)abled|empty|focus|link|root|target)(.*)/.exec(qp) || /^:(lang)\(\s*(['"])?(.*?)\2\s*\)(.*)/.exec(qp) || (!n && /^:(not)\(\s*(.*)\s*\)(.*)/.exec(qp)), x = 0;
        if (!m) {
          if (m = /^\s*([+>~,\s])\s*(\S.*)/.exec(qp)) {
            if (m[1] != ',')return type(m[2], js, n, t, m[1]);
            nqp = m[2];
            dup = 2;
          }
          else if (/\S/.test(qp))throw new Error('Illegal query near: ' + qp);
          return dup < 1 ? js : $('if(!h[x=n.LLn||(n.LLn=++Selector.guid)]){h[x]=$1;$2}', !srt || cdp ? 'true' : si ? 'n.sourceIndex' : 'Selector.srcIndex(h,n)', js);
        }
        if (!n && m[1] == '#' && dup != 2)dup = -1;
        js = pred(m[m.length - 1], js, n, t, 1);
        switch (m[1]) {
          case'#':
            return uniq(js, n, t, c, ie, 'n.id', '"' + m[2] + '"', 'd.getElementById("' + m[2] + '")');
          case'.':
            return bcn && !n && (!c || c == ' ') && (t == '*' || !mz) ? Object($('for(var n$1=n.getElementsByClassName("$2"),i$1=0;n=n$1[i$1++];)$3{$4}', ++i, m[2], t == '*' ? '' : 'if(n.nodeName==="' + t.toUpperCase() + '")', js)) : $(cmp['~='], n ? '!' : '', 'n.className', x = m[2], x.length, js);
          case'[':
            return (x = m[3]) ? $(cmp[x], n ? '!' : '', ie ? (x = m[2].toLowerCase()) == 'style' ? 'style.cssText.toLowerCase()' : ab[x] ? 'n.' + x + '&&"' + x + '"' : 'n.getAttribute("' + (am[x] || x) + '",2)' : 'n.getAttribute("' + m[2] + '")', x = m[5] || m[6], x.length, js) : $(ie ? 'if($1((x=n.getAttributeNode("$2"))&&x.specified)){$3}' : 'if($1n.hasAttribute("$2")){$3}', n ? '!' : '', m[2], js);
          case'active':
          case'focus':
            return uniq(js, n, t, c, 0, 'n', 'd.activeElement');
          case'checked':
            return $('if($1(n.checked||n.selected)){$2}', n ? '!' : '', js);
          case'disabled':
            x = 1;
          case'enabled':
            return $('if(n.disabled===$1$2){$3}', !!(x ^ n), ie ? '&&((x=n.nodeName)==="BUTTON"||x==="INPUT"||x==="OPTION"||x==="OPTGROUP"||x==="SELECT"||x==="TEXTAREA"' : '', js);
          case'empty':
            return $('for(x=n.firstChild;x&&x.nodeType>3;x=x.nextSibling);if($1x){$2}', n ? '' : '!', js);
          case'first':
            return flo(js, n, m[2], 'previous');
          case'lang':
            return $(cmp['|='], n ? '!' : '', 'n.lang', x = m[3], x.length, js);
          case'last':
            return flo(js, n, m[2], 'next');
          case'link':
            return $('if($1(n.nodeName==="A"&&n.href)){$2}', n ? '!' : '', js);
          case'nth':
            var a = m[4] ? 2 : m[5] == '-' ? -1 : m[7] ? 0 : m[5] ? m[5] - 0 : 1, b = m[4] == 'odd' ? 1 : (m[6] || m[7]) - 0 || 0;
            if (a == 1)return js;
            if (a == 0 && b == 1)return flo(js, n, m[3], m[2] ? 'next' : 'previous');
            if (a == b)b = 0;
            if (b < 0)b = a + b;
            idx = 1;
            return $('if($1(Selector.nthIndex(LLi,n,$2,"node$3",$4)$5)){$6}', n ? '!' : '', !!m[2], m[3] ? 'Type' : 'Name', m[3] ? '1' : 'n.nodeName', a < 0 ? '<=' + b : a ? '%' + a + '===' + b : '===' + b, js);
          case'not':
            return type(m[2], js, 1, '*');
          case'only':
            return flo(js, n, m[2]);
          case'root':
            return uniq(js, n, t, c, 0, 'n', 'd.documentElement');
          case'target':
            x = '(d.defaultView||d.parentWindow||window).location.hash.substr(1)';
            return uniq(js, n, t, c, ie, 'n.id', x, 'd.getElementById(' + x + ')');
        }
      }
    }, uniq: function (js, n, t, c, d, p, v, w) {
      return (n || (c && c != ' ') || d) ? $(n ? 'if($1!==$2){$3}' : 'if($1===$2){$3break q}', p, v, js) : Object($(ec ? 'if((x=$1)===n||!n.contains||n.contains(x))$2' : cdp ? 'if((x=$1)===n||!n.compareDocumentPosition||n.compareDocumentPosition(x)&16)$2' : 'for(x=y=$1;y;y=y.parentNode)if(y===n)$2', w || v, t == '*' ? '{n=x;' + js + 'break q}' : '{if((n=x).nodeName==="' + t.toUpperCase() + '"){' + js + '}break q}'));
    }, flo: function (js, n, t, s) {
      return $(s ? 'for($2x=n.$1Sibling;x&&x.node$3;x=x.$1Sibling);if($4x){$5}' : 'for($2(x=n.parentNode)&&(x=x.firstChild);x&&(x.node$3||x===n);x=x.nextSibling);if($4x){$5}', s, t ? '' : 'y=n.nodeName,', t ? 'Type!==1' : 'Name!==y', n ? '' : '!', js);
    }
  };
}

window.Selector = Selector;

CSSUtilities.define('mode', 'browser');
CSSUtilities.define('async', false);
CSSUtilities.define('attributes', true);

const WINDOW_WIDTH_PX = parseInt(arguments[1]);
const WINDOW_WIDTH_EM = WINDOW_WIDTH_PX / 16;

function ruleAllowed(media) {
  if (media == 'all') {
    return true;
  }
  
  if (media == 'print') {
    return false;
  }
  
  var splitMedia = media.split(' and ').map(function(_){
    return _.replace('(', '').replace(')', '').replace(' ', '');
  });
  
  if (!splitMedia) {
    return false;
  }
  
  var maxWidthVal, minWidthVal, maxWidthUnits, minWidthUnits;
  splitMedia.forEach(function (m) {
    if (m.indexOf('max-width') == 0) {
      var maxWidth = m.split(':')[1];
      maxWidthVal = parseInt(maxWidth);
      maxWidthUnits = maxWidth.replace(maxWidthVal, '').trim();
    }
    if (m.indexOf('min-width') == 0) {
      var minWidth = m.split(':')[1];
      minWidthVal = parseInt(minWidth);
      minWidthUnits = minWidth.replace(minWidthVal, '').trim();
    }
  });
  
  if (maxWidthVal && maxWidthUnits) {
    switch (maxWidthUnits) {
      case 'px':
        return maxWidthVal >= WINDOW_WIDTH_PX;
      case 'em':
        return maxWidthVal >= WINDOW_WIDTH_EM;
    }
  }
  
  if (minWidthVal && minWidthUnits) {
    switch (minWidthUnits) {
      case 'px':
        return minWidthVal <= WINDOW_WIDTH_PX;
      case 'em':
        return minWidthVal <= WINDOW_WIDTH_EM;
    }
  }

  return false;
}

function update(obj/*, …*/) {
  for (var i = 1; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      var val = arguments[i][prop];
      
      if (typeof val == 'object') {
        if (!obj.hasOwnProperty(prop)) {
          obj[prop] = {};
        }
        
        update(obj[prop], val);
      }
      else {
        // overwrite the prop if the current val has !important or the previous val doesn't have !important
        if (val.indexOf('!important') != -1 || !obj.hasOwnProperty(prop) || obj[prop].toString().indexOf('!important') == -1) {
          obj[prop] = val;
        }
      }
    }
  }
  return obj;
}

window.propsMap = arguments[0];

function allowedRules(el) {
  var rules = CSSUtilities.getCSSRules(el, '*');
  var allowedRules = [];

  // Filter CSS rules by those that are valid (based on media type and/or value)
  rules.forEach(function (rule) {
    if (rule.properties && ruleAllowed(rule.media || '')) {
      allowedRules.push(rule);
    }
  });

  return allowedRules;
}

function isTranslate(prop) {
  return startsWith(prop, 'translateX(') ||
    startsWith(prop, 'translateY(') ||
    startsWith(prop, 'translate(') ||
    startsWith(prop, 'translate3d(');
}

function startsWith(str, substr) {
  return str.indexOf(substr) == 0;
}

window.urlToAbsolute = function (url) {
  if (startsWith(url, '//')) {
    return document.location.protocol + url;
  } else if (startsWith(url, '/') || (!startsWith(url, 'http') && !startsWith(url, 'data'))) {
    if (startsWith(url, '/')) {
      url = url.substr(1);
    }
    
    return document.location.origin + '/' + url;
  } else {
    return url;
  }
};

function reduceProps(props, el) {
  var allowedProps = {};
  var val;

  for (var p in props) {
    // propsMap is just props.json
    if (window.propsMap.hasOwnProperty(p)) {
      val = props[p].value;

      if (val && typeof val === 'string') {
        val = val.toLowerCase().replace('!important', '').trim();

        if (has(val, 'calc(')){
          val = getComputedStyle(el)[p];
        }
      }

      allowedProps[p] = val;
    }
  }
  
  return allowedProps;
}

function computeNewPctPos(el, side, sideVal, translateVal) {
  var measurement = 'width';
  
  if (side == 'top' || side == 'bottom') {
    measurement = 'height';
  }
  
  var computedStyle = getComputedStyle(el);
  var computedSide = parseInt(computedStyle[side]);
  var computedMeasurement = parseInt(computedStyle[measurement]);
  var totalMeasurementPx = computedSide / (sideVal / 100);
  var translatePx = computedMeasurement * (translateVal / 100);
  return (((computedSide + translatePx) / totalMeasurementPx) * 100) + '%';
}

// Convert transform-translate's into positional css props
function fixTransforms(props, el) {
  // clone props at this state
  var propsCopy = {};
  for (var k in props) {
    propsCopy[k] = props[k];
  }

  var propVal;
  for (var p in props) {
    propVal = props[p];

    // if not a transform: translate, just move on
    if (p != 'transform' || !isTranslate(propVal)) {
      continue;
    }

    var x = null;
    var y = null;
    var xy = null;
    var xyz = null;

    propVal = propVal.substr(0, propVal.indexOf(')') + 1);

    if (startsWith(propVal, 'translateX(')) {
      x = propVal.match(/translateX\((.*)\)/)[1].trim();
    } else if (startsWith(propVal, 'translateY(')) {
      y = propVal.match(/translateY\((.*)\)/)[1].trim();
    } else if (startsWith(propVal, 'translate(')) {
      xy = propVal.match(/translate\((.*)\)/)[1].replace(' ', '').split(',');
      x = xy[0];
      y = xy[1];
    } else {  // translate3d( --> X,Y,Z
      xyz = propVal.match(/translate3d\((.*)\)/)[1].replace(' ', '').split(',');
      x = xyz[0];
      y = xyz[1];
    }

    if (x) {
      var xVal = parseInt(x);
      var xUnits = x.replace(xVal.toString(), '');

      if (props.left && props.right && props.left != 'auto' && props.right != 'auto') {
        continue;
      }

      if (props.left && props.left != 'auto') {
        var left = props.left.trim();
        var leftVal = parseInt(left);
        var leftUnits = left.replace(leftVal.toString(), '');

        if (leftVal == 0|| isNaN(leftVal) || xUnits != leftUnits) {
          continue;
        }

        if (xUnits == 'px') {
          propsCopy.left = leftVal + xVal + 'px';
        } else if (xUnits == '%') {
          propsCopy.left = computeNewPctPos(el, 'left', leftVal, xVal);
        }
      } else if (props.right && props.right != 'auto') {
        var right = props.right.trim();
        var rightVal = parseInt(right);
        var rightUnits = right.replace(rightVal.toString(), '');

        if (rightVal == 0|| isNaN(rightVal) || xUnits != rightUnits) {
          continue;
        }

        xVal = -1 * xVal; // swap around signs

        if (xUnits == 'px') {
          propsCopy.right = rightVal + xVal + 'px';
        } else if (xUnits == '%') {
          propsCopy.right = computeNewPctPos(el, 'right', rightVal, xVal);
        }
      } else {
        propsCopy.left = x;
      }
    }

    if (y) {
      var yVal = parseInt(y);
      var yUnits = y.replace(yVal.toString(), '');

      if (props.top && props.bottom && props.top != 'auto' && props.bottom != 'auto') {
        continue;
      }

      if (props.top) {
        var top = props.top.trim();
        var topVal = parseInt(top);
        var topUnits = top.replace(topVal.toString(), '');

        if (topVal == 0|| isNaN(topVal) || yUnits != topUnits) {
          continue;
        }

        if (yUnits == 'px') {
          propsCopy.top = topVal + yVal + 'px';
        } else if (yUnits == '%') {
          propsCopy.top = computeNewPctPos(el, 'top', topVal, yVal);
        }
      } else if (props.bottom) {
        var bottom = props.bottom.trim();
        var bottomVal = parseInt(bottom);
        var bottomUnits = bottom.replace(bottomVal.toString(), '');

        if (bottomVal == 0|| isNaN(bottomVal) || yUnits != bottomUnits) {
          continue;
        }

        yVal = -1 * yVal; // swap around signs

        if (yUnits == 'px') {
          propsCopy.bottom = bottomVal + yVal + 'px';
        } else if (yUnits == '%') {
          propsCopy.bottom = computeNewPctPos(el, 'bottom', bottomVal, yVal);
        }
      } else {
        propsCopy.top = y;
      }
    }

    if (['relative', 'absolute', 'fixed'].indexOf(props['position']) == -1) {
      propsCopy.position = 'relative';
    }

    if (x || y) {
      continue;
    }
  }

  return propsCopy;
}

function handleAttrProps(props, el) {
  var validAttrProps = {
    'width': 'width',
    'height': 'height',
    'valign': 'vertical-align',
    'bgcolor': 'background-color'
  };

  var prop, attrVal;
  for (var attr in validAttrProps) {
    prop = validAttrProps[attr];

    // if the element has the attribute, but not the prop, add it as a prop
    if (el.hasAttribute(attr) && !props.hasOwnProperty(prop)) {
      attrVal = el.getAttribute(attr);

      // if no units on the width/height attr val (most likely) --> give it px
      if ((attr == 'width' || attr == 'height') && parseFloat(attrVal) == attrVal) {
        attrVal = attrVal + 'px';
      }

      props[prop] = attrVal;
    }
  }

  return props;
}

function rulesToProps(rules) {
  var props = {};

  // Populate a props map that updates/overwrites props from least-to-most relevant CSS rules
  var properties;
  for (var i = 0; i < rules.length; i++) {
    properties = rules[i].properties || {};

    if (properties) {
      props = update(props, properties);
    }
  }

  return props;
}

function setDirectionsOnPositionalEls(props) {
  var pos = props.position;

  if (pos == 'absolute' || pos == 'fixed') {
    var hasDirectionalProp = props.hasOwnProperty('top') ||
      props.hasOwnProperty('bottom') ||
      props.hasOwnProperty('left') ||
      props.hasOwnProperty('right');

    if (!hasDirectionalProp) {
      props.top = 0;
      props.left = 0;
    }
  }

  return props;
}

CSSUtilities.getCSSProps = function (el) {
  // Get allowed CSS rules based on media type and/or value
  var rules = allowedRules(el);

  // Convert CSS rules to properties
  var props = rulesToProps(rules);

  // Remove any props we don't support, remove !important, and fix calc()'s
  props = reduceProps(props, el);

  // Convert transform/translates into positional props (top/bottom/left/right)
  props = fixTransforms(props, el);

  // Handle css props that are also valid attributes
  props = handleAttrProps(props, el);

  // If position is 'absolute' or 'fixed' but has no directional prop, set 'top' and 'left' to 0.
  props = setDirectionsOnPositionalEls(props);

  // If body has overflow:hidden, remove it
  if (el.tagName == 'BODY' && props.overflow == 'hidden') {
    delete props.overflow;
  }

  return props;
};