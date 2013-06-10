#include "GlutWin.h"

GlutWin::GlutWin( int windowHeight, int windowWidth,
				  int windowPosX, int windowPosY,
				  unsigned int displayMode,
				  const char * windowTitle ) {
	
	// initialize members
	windowTitle = windowTitle;
	windowHeight= windowHeight;
	windowWidth	= windowWidth;
	windowPosX	= windowPosX;
	windowPosY	= windowPosY;
	displayMode = displayMode;
	fullScreen	= false;

	// make some dummy command line for glut
	char	cmd_line[8];
	char *	argv[1];
	argv[0] = cmd_line;
	int		argc = 1;

	// initialize glut
	glutInit( &argc, argv );

	// initialize window
	glutInitWindowSize( windowWidth, windowHeight );
	glutInitWindowPosition( windowPosX, windowPosY );
	glutInitDisplayMode( displayMode );

	// create window
	windowID	= glutCreateWindow( windowTitle );

	// set the view frustum
	glMatrixMode( GL_PROJECTION ); 
	glLoadIdentity();
	gluOrtho2D( 0, windowWidth, 0, windowHeight );

	glMatrixMode( GL_MODELVIEW );
	// clear rendering surface
	glClearColor(0.0f, 0.0f, 0.0f, 0.0f);  // background is black
	glViewport(0, 0, windowWidth, windowHeight);

}
