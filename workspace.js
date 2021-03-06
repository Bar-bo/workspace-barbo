/* global cpdefine chilipeppr cprequire */
cprequire_test(["inline:com-chilipeppr-workspace-barbo"], function(ws) {

    console.log("initting workspace");

    /**
     * The Root workspace (when you see the ChiliPeppr Header) auto Loads the Flash 
     * Widget so we can show the 3 second flash messages. However, in test mode we
     * like to see them as well, so just load it from the cprequire_test() method
     * so we have similar functionality when testing this workspace.
     */
    var loadFlashMsg = function() {
        chilipeppr.load("#com-chilipeppr-widget-flash-instance",
            "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
            function() {
                console.log("mycallback got called after loading flash msg module");
                cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                    //console.log("inside require of " + fm.id);
                    fm.init();
                });
            }
        );
    };
    loadFlashMsg();
        
    // Init workspace
    ws.init();
    
    // Do some niceties for testing like margins on widget and title for browser
    $('title').html("barbo Workspace");
    $('body').css('padding', '10px');

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-workspace-barbo", ["chilipeppr_ready"], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-workspace-barbo", // Make the id the same as the cpdefine id
        name: "Workspace / barbo", // The descriptive name of your widget.
        desc: `A ChiliPeppr Workspace barbo.`,
        url: "(auto fill by runme.js)", // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)", // The standalone working widget so can view it working by itself
        /**
         * Contains reference to the Console widget object. Hang onto the reference
         * so we can resize it when the window resizes because we want it to manually
         * resize to fill the height of the browser so it looks clean.
         */
        widgetConsole: null,
        /**
         * Contains reference to the Serial Port JSON Server object.
         */
        widgetSpjs: null,
        /**
         * The workspace's init method. It loads the all the widgets contained in the workspace
         * and inits them.
         */
        init: function() {

            // Most workspaces will instantiate the Serial Port JSON Server widget
            this.loadSpjsWidget();
            this.loadGcodeWidget();
            this.load3dviewerWidget();
            // Most workspaces will instantiate the Serial Port Console widget
            this.loadConsoleWidget(function() {
                setTimeout(function() { $(window).trigger('resize'); }, 100);
            });
            
            this.loadCayennWidget();
            
            this.loadSvg2gcodeWidget();
            
            this.loadFont2gcodeWidget();
           
            this.loadEagleWidget();
            
            this.loadSoldermaskWidget();
            
            this.loadMacroWidget();
            
            this.loadTouchplateWidget();
            
            this.loadAutolevelWidget();
             
            this.loadXyzWidget();
            
            this.loadProgrammerWidget();
            
            this.loadTemplateWidget();
            
            // Create our workspace upper right corner triangle menu
            this.loadWorkspaceMenu();
            // Add our billboard to the menu (has name, url, picture of workspace)
            this.addBillboardToWorkspaceMenu();
            
            // Setup an event to react to window resize. This helps since
            // some of our widgets have a manual resize to cleanly fill
            // the height of the browser window. You could turn this off and
            // just set widget min-height in CSS instead
            this.setupResize();
            setTimeout(function() { $(window).trigger('resize'); }, 100);

        },
        /**
         * Returns the billboard HTML, CSS, and Javascript for this Workspace. The billboard
         * is used by the home page, the workspace picker, and the fork pulldown to show a
         * consistent name/image/description tag for the workspace throughout the ChiliPeppr ecosystem.
         */
        getBillboard: function() {
            var el = $('#' + this.id + '-billboard').clone();
            el.removeClass("hidden");
            el.find('.billboard-desc').text(this.desc);
            return el;
        },
        /**
         * Inject the billboard into the Workspace upper right corner pulldown which
         * follows the standard template for workspace pulldown menus.
         */
        addBillboardToWorkspaceMenu: function() {
            // get copy of billboard
            var billboardEl = this.getBillboard();
            $('#' + this.id + ' .com-chilipeppr-ws-billboard').append(billboardEl);
        },
        /**
         * Listen to window resize event.
         */
        setupResize: function() {
            $(window).on('resize', this.onResize.bind(this));
        },
        /**
         * When browser window resizes, forcibly resize the Console window
         */
        onResize: function() {
            if (this.widgetConsole) this.widgetConsole.resize();
        },
        /**
         * Load the Template widget via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadTemplateWidget: function(callback) {

            chilipeppr.load(
                "#com-chilipeppr-widget-template-instance",
                "http://raw.githubusercontent.com/chilipeppr/widget-template/master/auto-generated-widget.html",
                function() {
                    // Callback after widget loaded into #myDivWidgetTemplate
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                        ["inline:com-chilipeppr-widget-template"], // the id you gave your widget
                        function(myObjWidgetTemplate) {
                            // Callback that is passed reference to the newly loaded widget
                            console.log("Widget / Template just got loaded.", myObjWidgetTemplate);
                            myObjWidgetTemplate.init();
                        }
                    );
                }
            );
        },
        /**
         * Load the Gcode List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadGcodeWidget: function(callback) {

            chilipeppr.load(
                "#com-chilipeppr-widget-gcode",
                "http://raw.githubusercontent.com/chilipeppr/widget-gcodelist/master/auto-generated-widget.html",
                function() {
                    // Callback after widget loaded into #myDivWidgetGcode
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                         ["inline:com-chilipeppr-widget-gcode"], // the id you gave your widget
                         function(myObjWidgetGcode) {
                            // Callback that is passed reference to the newly loaded widget
                            console.log("Widget / Gcode v8 just got loaded.", myObjWidgetGcode);
                            myObjWidgetGcode.init();
                        }
                    );
                }
            );
        },
        /**
         * Load the 3dviewer List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        load3dviewerWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-3dviewer",
              "http://raw.githubusercontent.com/chilipeppr/widget-3dviewer/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidget3dviewer
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-3dviewer"], // the id you gave your widget
                  function(myObjWidget3dviewer) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / 3D GCode Viewer just got loaded.", myObjWidget3dviewer);
                    myObjWidget3dviewer.init();
                  }
                );
              }
            );
        },
        /**
         * Load the svg2code List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadSvg2gcodeWidget: function(callback) {

            chilipeppr.load(
              "#com-zipwhip-widget-svg2gcode",
              "http://raw.githubusercontent.com/chilipeppr/widget-svg2gcode/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivComZipwhipWidgetSvg2gcode
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-zipwhip-widget-svg2gcode"], // the id you gave your widget
                  function(myObjComZipwhipWidgetSvg2gcode) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / svg2gcode just got loaded.", myObjComZipwhipWidgetSvg2gcode);
                    myObjComZipwhipWidgetSvg2gcode.init();
                  }
                );
              }
            );
        },
        /**
         * Load the font2gcode List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadFont2gcodeWidget: function(callback) {

            chilipeppr.load(
              "#com-zipwhip-widget-font2gcode",
              "http://raw.githubusercontent.com/chilipeppr/widget-font2gcode/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivComZipwhipWidgetFont2gcode
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-zipwhip-widget-font2gcode"], // the id you gave your widget
                  function(myObjComZipwhipWidgetFont2gcode) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Font2Gcode just got loaded.", myObjComZipwhipWidgetFont2gcode);
                    myObjComZipwhipWidgetFont2gcode.init();
                  }
                );
              }
            );
        },
        /**
         * Load the eagle List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadEagleWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-eagle",
              "http://raw.githubusercontent.com/chilipeppr/widget-eagle/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetEagle
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-eagle"], // the id you gave your widget
                  function(myObjWidgetEagle) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Eagle BRD v5.4 just got loaded.", myObjWidgetEagle);
                    myObjWidgetEagle.init();
                  }
                );
              }
            );
        },
        /**
         * Load the soldermask List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadSoldermaskWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-eagle-soldermask",
              "http://raw.githubusercontent.com/chilipeppr/widget-eagle-soldermask/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetInsertedInto
                cprequire(
                  ["inline:com-chilipeppr-widget-eagle-soldermask"], // the id you gave your widget
                  function(mywidget) {
                    // Callback that is passed reference to your newly loaded widget
                    console.log("My widget just got loaded.", mywidget);
                    mywidget.init();
                  }
                );
              }
            );
        },
        /**
         * Load the macro List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadMacroWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-macro",
              "http://raw.githubusercontent.com/chilipeppr/widget-macro/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetMacro
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-macro"], // the id you gave your widget
                  function(myObjWidgetMacro) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Macro just got loaded.", myObjWidgetMacro);
                    myObjWidgetMacro.init();
                  }
                );
              }
            );
        },
        /**
         * Load the touchplate List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadTouchplateWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-touchplate",
              "http://raw.githubusercontent.com/chilipeppr/widget-touchplate/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetTouchplate
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-touchplate"], // the id you gave your widget
                  function(myObjWidgetTouchplate) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Touch Plate just got loaded.", myObjWidgetTouchplate);
                    myObjWidgetTouchplate.init();
                  }
                );
              }
            );
        },
        /**
         * Load the autolevel List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadAutolevelWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-autolevel",
              "http://raw.githubusercontent.com/chilipeppr/widget-autolevel/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetAutolevel
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-autolevel"], // the id you gave your widget
                  function(myObjWidgetAutolevel) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Auto-Level just got loaded.", myObjWidgetAutolevel);
                    myObjWidgetAutolevel.init();
                  }
                );
              }
            );
        },
        /**
         * Load the xyz List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadXyzWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-xyz",
              "http://raw.githubusercontent.com/chilipeppr/widget-axes/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetXyz
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-xyz"], // the id you gave your widget
                  function(myObjWidgetXyz) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / XYZ Axes v2 just got loaded.", myObjWidgetXyz);
                    myObjWidgetXyz.init();
                  }
                );
              }
            );
        },
        /**
         * Load the Serial Port JSON Server widget via chilipeppr.load()
         */
        loadSpjsWidget: function(callback) {

            var that = this;

            chilipeppr.load(
                "#com-chilipeppr-widget-serialport-instance",
                "http://fiddle.jshell.net/chilipeppr/vetj5fvx/show/light/",
                function() {
                    console.log("mycallback got called after loading spjs module");
                    cprequire(["inline:com-chilipeppr-widget-serialport"], function(spjs) {
                        //console.log("inside require of " + fm.id);
                        spjs.setSingleSelectMode();
                        spjs.init({
                            isSingleSelectMode: true,
                            defaultBuffer: "default",
                            defaultBaud: 115200,
                            bufferEncouragementMsg: 'For your device please choose the "default" buffer in the pulldown and a 115200 baud rate before connecting.'
                        });
                        //spjs.showBody();
                        //spjs.consoleToggle();

                        that.widgetSpjs - spjs;
                        
                        if (callback) callback(spjs);

                    });
                }
            );
        },
        /**
         * Load the programmer List via chilipeppr.load() so folks have a sample
         * widget they can fork as a starting point for their own.
         */
        loadProgrammerWidget: function(callback) {

            chilipeppr.load(
              "#com-chilipeppr-widget-programmer",
              "http://raw.githubusercontent.com/chilipeppr/widget-programmer/master/auto-generated-widget.html",
              function() {
                // Callback after widget loaded into #myDivWidgetProgrammer
                // Now use require.js to get reference to instantiated widget
                cprequire(
                  ["inline:com-chilipeppr-widget-programmer"], // the id you gave your widget
                  function(myObjWidgetProgrammer) {
                    // Callback that is passed reference to the newly loaded widget
                    console.log("Widget / Programmer just got loaded.", myObjWidgetProgrammer);
                    myObjWidgetProgrammer.init();
                  }
                );
              }
            );
        },
        /**
         * Load the Cayenn widget via chilipeppr.load()
         */
        loadCayennWidget: function(callback) {

            var that = this;

            chilipeppr.load(
                "#com-chilipeppr-widget-cayenn",
                "http://raw.githubusercontent.com/chilipeppr/widget-cayenn/master/auto-generated-widget.html",
                function() {
                    // Callback after widget loaded into #myDivWidgetCayenn
                    // Now use require.js to get reference to instantiated widget
                    cprequire(
                      ["inline:com-chilipeppr-widget-cayenn"], // the id you gave your widget
                      function(myObjWidgetCayenn) {
                        // Callback that is passed reference to the newly loaded widget
                        console.log("Widget / Cayenn just got loaded.", myObjWidgetCayenn);
                        myObjWidgetCayenn.init();
                      }
                    );
                }
            );
        },
        /**
         * Load the Console widget via chilipeppr.load()
         */
        loadConsoleWidget: function(callback) {
            var that = this;
            chilipeppr.load(
                "#com-chilipeppr-widget-spconsole-instance",
                "http://fiddle.jshell.net/chilipeppr/rczajbx0/show/light/",
                function() {
                    // Callback after widget loaded into #com-chilipeppr-widget-spconsole-instance
                    cprequire(
                        ["inline:com-chilipeppr-widget-spconsole"], // the id you gave your widget
                        function(mywidget) {
                            // Callback that is passed reference to your newly loaded widget
                            console.log("My Console widget just got loaded.", mywidget);
                            that.widgetConsole = mywidget;
                            
                            // init the serial port console
                            // 1st param tells the console to use "single port mode" which
                            // means it will only show data for the green selected serial port
                            // rather than for multiple serial ports
                            // 2nd param is a regexp filter where the console will filter out
                            // annoying messages you don't generally want to see back from your
                            // device, but that the user can toggle on/off with the funnel icon
                            that.widgetConsole.init(true, /myfilter/);
                            if (callback) callback(mywidget);
                        }
                    );
                }
            );
        },
        /**
         * Load the workspace menu and show the pubsubviewer and fork links using
         * our pubsubviewer widget that makes those links for us.
         */
        loadWorkspaceMenu: function(callback) {
            // Workspace Menu with Workspace Billboard
            var that = this;
            chilipeppr.load(
                "http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/",
                function() {
                    require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {

                        var el = $('#' + that.id + ' .com-chilipeppr-ws-menu .dropdown-menu-ws');
                        console.log("got callback for attachto menu for workspace. attaching to el:", el);

                        pubsubviewer.attachTo(
                            el,
                            that,
                            "Workspace"
                        );
                        
                        if (callback) callback();
                    });
                }
            );
        },
    }
});