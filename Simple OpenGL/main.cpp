//mesh on page 312, newell pg 271

#include <windows.h>  //suitable when using Windows 95/98/NT
#include <gl/Gl.h>
#include <gl/Glu.h>
#include <gl/glut.h>
//#include <glut.h>
#include <stdlib.h>
#include <iostream>


#include "GlutWin.h"
#include "Lab6.h"

Vector3 u, v, n;
Vector3 eye, look, up;
GLUquadricObj *qobj;

void myInit()
{
	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);
	glShadeModel(GL_SMOOTH);
	glEnable(GL_NORMALIZE);
	glEnable(GL_DEPTH_TEST);
	upx = 0;
	upy = 1;
	upz = 0;
	shape = SPHERE;
	cameraControl = -1;
	objectControl = -1;
	shading = SHADE;

	glLightfv(GL_LIGHT0, GL_POSITION, position);
	glLightfv(GL_LIGHT0, GL_DIFFUSE, lightIntensity);
	glLightfv(GL_LIGHT1, GL_POSITION, position2);
	glLightfv(GL_LIGHT1, GL_AMBIENT, lightIntensity2);

	glMaterialfv(GL_FRONT, GL_AMBIENT, ambient);
	glMaterialfv(GL_FRONT, GL_DIFFUSE, diffuse);

	glEnable(GL_COLOR_MATERIAL);
	eye.x = 10;
	eye.y = 10;
	eye.z = 10;
	look.x = 0;
	look.y = 0;
	look.z = 0;
	up.x = 0;
	up.y = 1;
	up.z = 0;
	qobj = gluNewQuadric();	
	scaleFactor = 1;
	objx = 0;
	objy = 0;
	objz = 0;
	objAngle1 = 0;
	objAngle2 = 0;
	red = 1;
	green = 0;
	blue = 0;
	
	glClearColor(1.0f, 1.0f, 1.0f,0.0f);  // background is white		
	glMatrixMode(GL_PROJECTION); // set the view volume shape
	glLoadIdentity();
	glOrtho(-3.5*worldWidth/worldHeight, 3.5*worldWidth/worldHeight, -3.5, 3.5, 0.1, 100);

}


void setModelviewMatrix()
{
	float m[16];
	Vector3 eyeV(eye.x, eye.y, eye.z);
	m[0] = u.x; m[1] = v.x; m[2] = n.x; m[3] = 0;
	m[4] = u.y; m[5] = v.y; m[6] = n.y; m[7] = 0;
	m[8] = u.z; m[9] = v.z; m[10] = n.z; m[11] = 0;
	m[12] = -1*eyeV.dot(u); m[13] = -1*eyeV.dot(v);
	m[14] = -1*eyeV.dot(n); m[15] = 1;
	glMatrixMode(GL_MODELVIEW);
	glLoadMatrixf(m);
}

void setCamera(Vector3 E, Vector3 L, Vector3 U)
{
	eye.set(E);
	look.set(L);
	up.set(U);
	n.set(eye.x-look.x, eye.y - look.y, eye.z - look.z);
	u.set(U.cross(n));
	v.set(n.cross(u));
	u.normalize();
	v.normalize();
	n.normalize();
	setModelviewMatrix();
}

void moveCamera(float du, float dv, float dn)
{
	eye.x += du*u.x + dv*v.x + dn*n.x;
	eye.y += du*u.y + dv*v.y + dn*n.y;
	eye.z += du*u.z + dv*v.z + dn*n.z;
	look.x += du*u.x + dv*v.x + dn*n.x;
	look.y += du*u.y + dv*v.y + dn*n.y;
	look.z += du*u.z + dv*v.z + dn*n.z;
	setModelviewMatrix();
}

void rollCamera(float angle)
{
	float cs = cos(PI/180*angle);
	float sn = sin(PI/180*angle);
	Vector3 t(u);
	u.set(cs*t.x - sn*v.x, cs*t.y - sn*v.y, cs*t.z - sn*v.z);
	v.set(sn*t.x + cs*v.x, sn*t.y + cs*v.y, sn*t.z + cs*v.z);
	setModelviewMatrix();
}

void yawCamera(float angle)
{
	float cs = cos(PI/180*angle);
	float sn = sin(PI/180*angle);
	Vector3 t(u);
	u.set(cs*t.x - sn*n.x, cs*t.y - sn*n.y, cs*t.z - sn*n.z);
	n.set(sn*t.x + cs*n.x, sn*t.y + cs*n.y, sn*t.z + cs*n.z);
	setModelviewMatrix();
}

void pitchCamera(float angle)
{
	float cs = cos(PI/180*angle);
	float sn = sin(PI/180*angle);
	Vector3 t(v);
	v.set(cs*t.x - sn*n.x, cs*t.y - sn*n.y, cs*t.z - sn*n.z);
	n.set(sn*t.x + cs*n.x, sn*t.y + cs*n.y, sn*t.z + cs*n.z);
	setModelviewMatrix();
}

void resetCamera()
{
	Vector3 eye0 = Vector3(10,10,10);
	Vector3 look0 = Vector3(0,0,0);
	Vector3 up0 = Vector3(0,1,0);
	setCamera(eye0, look0, up0);
	glutPostRedisplay();
}

void moveObject(float dx, float dy, float dz)
{
	objx += dx;
	objy += dy;
	objz += dz;
}

void rotateObject(float angle, int rotating)
{
	if(rotating == xRot) objAngle1 += angle;
	if(rotating == yRot) objAngle2 += angle;
}

void scaleObject(float factor)
{
	scaleFactor += factor;
}

void resetObject()
{
	objAngle1 = 0;
	objAngle2 = 0;
	objx = 0;
	objy = 0;
	objz = 0;
	scaleFactor = 1;
	glutPostRedisplay();
}


void mainMenu(int option)
{
}

void processCamera(int option) 
{
	objectControl = -1;
	switch (option) {
		//MOVE CAMERA
		case 0 : 
			cameraControl = MOVECAM;
			break;
		//ROTATE CAMERA
		case 1 : 
			cameraControl = ROTATECAM;
			break;
		//ZOOM CAMERA
		case 2:
			cameraControl = ZOOMCAM;
			break;
		//RESET CAMERA
		case 3:
			cameraControl = -1;
			resetCamera();		
		default:
			cameraControl = -1;		
			break;
	}
	glutPostRedisplay();
}

void processModeling(int option)
{
	cameraControl = -1;
	objectControl = -1;
	switch (option) {
		//draw sphere
		case 0 : 
			shape = SPHERE;
			break;
		case 1: 
			shape = CYLINDER;
			break;
		case 2: 
			shape = TEAPOT;
			break;
		default:
			break;
	}
	glutPostRedisplay();
}

void processTransform(int option)
{
	cameraControl = -1;
	switch(option) {
	case 0:
		objectControl = TRANSLATE;
		break;
	case 1: 
		objectControl = ROTATE;
		break;
	case 2:
		objectControl = SCALE;
		break;
	case 3:
		objectControl = -1;
		resetObject();
		break;
	default:
		objectControl = -1;
		break;
	}
}

void processShade(int option)
{
	cameraControl = -1;
	objectControl = -1;
	switch(option) {
	case 0:
		shading = WIREFRAME;
		break;
	case 1:
		shading = SHADE;
		glEnable(GL_LIGHT0);
		glDisable(GL_LIGHT1);
		glMaterialfv(GL_FRONT, GL_AMBIENT, ambient);
		glMaterialfv(GL_FRONT, GL_DIFFUSE, diffuse);
		break;
	case 2:
		shading = SHADE;
		glEnable(GL_LIGHT1);
		glDisable(GL_LIGHT0);			
		glMaterialfv(GL_FRONT, GL_SPECULAR, specular);
		glMaterialfv(GL_FRONT, GL_SHININESS, shininess);
		break;
	default:			
		break;		
	}
	glutPostRedisplay();
}

void processColor(int option)
{
	switch(option) {
	//RED
	case 0:
		red = 1;
		green = 0;
		blue = 0;
		break;
	//ORANGE
	case 1:
		red = 1;
		green = 0.5;
		blue = 0;
		break;
	//YELLOW
	case 2:
		red = 1;
		green = 1;
		blue = 0;
		break;
	//GREEN
	case 3:
		red = 0;
		green = 1;
		blue = 0;
		break;
	//BLUE
	case 4:
		red = 0;
		green = 0;
		blue = 1;
		break;
	//PURPLE
	case 5:
		red = 0.75;
		green = 0;
		blue = 0.75;
		break;
	default:
		red = 1;
		green = 0;
		blue = 0;
		break;
	}
	glutPostRedisplay();
}

void createGLUTMenus() {

	int menu, objectMenu, modeling, camera, transform, shadeMenu, colorMenu;

	//CAMERA CONTROLS
	camera = glutCreateMenu(processCamera);	
	glutAddMenuEntry("Move Camera", 0);
	glutAddMenuEntry("Rotate Camera", 1);
	glutAddMenuEntry("Zoom Camera", 2);
	glutAddMenuEntry("Reset Camera", 3);

	modeling = glutCreateMenu(processModeling);
	glutAddMenuEntry("Sphere", 0);
	glutAddMenuEntry("Cylinder", 1);
	glutAddMenuEntry("Teapot",2);

	transform = glutCreateMenu(processTransform); 
	glutAddMenuEntry("Translate", 0);
	glutAddMenuEntry("Rotate", 1);
	glutAddMenuEntry("Scale", 2);
	glutAddMenuEntry("Reset Transformations", 3);

	shadeMenu = glutCreateMenu(processShade);
	glutAddMenuEntry("Wireframe", 0);
	glutAddMenuEntry("Specular", 1);
	glutAddMenuEntry("Ambient", 2);

	colorMenu = glutCreateMenu(processColor);
	glutAddMenuEntry("Red", 0);
	glutAddMenuEntry("Orange", 1);
	glutAddMenuEntry("Yellow", 2);
	glutAddMenuEntry("Green", 3);
	glutAddMenuEntry("Blue", 4);
	glutAddMenuEntry("Purple", 5);

	objectMenu = glutCreateMenu(mainMenu);
	glutAddSubMenu("Shapes", modeling);
	glutAddSubMenu("Transformations", transform);
	glutAddSubMenu("Shading", shadeMenu);
	glutAddSubMenu("Color", colorMenu);

	menu = glutCreateMenu(mainMenu);
	glutAddSubMenu("Camera Controls", camera);
	glutAddSubMenu("Modeling", objectMenu);

	// attach the menu to the right button
	glutAttachMenu(GLUT_RIGHT_BUTTON);
}



void drawAxes()
{
	glBegin(GL_LINES);
		//x
		glColor3f(1.0f, 0.0f, 0.0f);
		glVertex3f(0,0,0);
		glVertex3f(100,0,0);
		//y
		glColor3f(0.0f, 1.0f, 0.0f);
		glVertex3f(0,0,0);
		glVertex3f(0,100,0);
		//z
		glColor3f(0.0f, 0.0f, 1.0f);
		glVertex3f(0,0,0);
		glVertex3f(0,0,100);
	glEnd();
}

void drawShape()
{	
	//COLOR
	glColor3f(red, green, blue);
	glPushMatrix();
	glTranslated(objx, objy, objz);
	glRotated(objAngle1, 0, 1, 0);
	glRotated(objAngle2, 1, 0, 1);
	glScaled(scaleFactor, scaleFactor, scaleFactor);
	//SHAPE SELECTION
	if(shading == SHADE)
	{
		if(shape==SPHERE) glutSolidSphere(0.5*shapeSize, 20, 16);		
		if(shape==CYLINDER) 
		{
			gluQuadricDrawStyle(qobj, GLU_FILL);
			gluQuadricNormals(qobj, GLU_SMOOTH);
			glPushMatrix();
			glRotated(270,1,0,0);
			gluCylinder(qobj, 0.5*shapeSize, 0.5*shapeSize, shapeSize, 32, 32);
			glPopMatrix();
		}
		if(shape==TEAPOT) glutSolidTeapot(shapeSize);
	}
	if(shading == WIREFRAME)
	{
		if(shape==SPHERE) glutWireSphere(0.5*shapeSize, 20, 16);
		if(shape==CYLINDER)
		{
			gluQuadricDrawStyle(qobj, GLU_LINE); 
			gluQuadricNormals(qobj, GLU_NONE);
			glPushMatrix();
			glRotated(270,1,0,0);
			gluCylinder(qobj, 0.5*shapeSize, 0.5*shapeSize, shapeSize, 32, 32);
			glPopMatrix();
		}
		if(shape==TEAPOT) glutWireTeapot(shapeSize);
	}
	glPopMatrix();
}




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<< displayWire >>>>>>>>>>>>>>>>>>>>>>
void display()
{	
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);     // clear the screen 
	setModelviewMatrix();
	drawAxes();
	drawShape();

	glutSwapBuffers();
}

void myMouse(int button, int state, int x, int y)
{
	if(button == GLUT_LEFT_BUTTON && state == GLUT_DOWN)
	{
		xPrev = x;
		yPrev = y;
	}
	
	//these track the drag motion
	
}


void myMouseDrag(int x, int y)
{
	if(cameraControl == ROTATECAM)
	{
		if(abs(y-yPrev)>yAcc)
		{
			pitchCamera((yPrev-y)/25);
			yPrev = y;
		}
		if(abs(x-xPrev)>xAcc)
		{
			yawCamera((x-xPrev)/25);
			xPrev = x;
		}
	}

	if(cameraControl == MOVECAM)
	{
		if(abs(x-xPrev)>xAcc) 
		{
				moveCamera((xPrev-x)/100, 0, (x-xPrev)/100);
				xPrev = x;					
		}
			
		if(abs(y-yPrev)>yAcc) 
		{
			//moveCamera((y-yPrev)/100, 0, (yPrev-y)/100);
			moveCamera(0, (y-yPrev)/100, 0);
			yPrev = y;
		}		
	}

	if(cameraControl == ZOOMCAM)
	{
		if(abs(y-yPrev)>yAcc)
		{
			shapeSize -= (y-yPrev)/100;
			yPrev = y;
		}
	}

	if(objectControl == TRANSLATE)
	{
		if(abs(yPrev-y)>yAcc)
		{
			moveObject((y-yPrev)/100, 0, (y-yPrev)/100);
			yPrev = y;
		}
		if(abs(xPrev-x)>xAcc)
		{
			moveObject((x-xPrev)/100, 0, (xPrev-x)/100);
			xPrev = x;
		}
	}
	
	if(objectControl == ROTATE)
	{
		if(abs(yPrev-y)>yAcc)
		{
			rotateObject((yPrev-y)/5, yRot);
			yPrev = y;
		}
		if(abs(xPrev-x)>xAcc)
		{
			rotateObject((x-xPrev)/5, xRot);
			xPrev = x;
		}
	}

	if(objectControl == SCALE)
	{
		if(abs(yPrev-y)>yAcc)
		{
			scaleObject((yPrev-y)/10);
			yPrev = y;
		}
		if(abs(xPrev-x)>xAcc)
		{
			scaleObject((xPrev-x)/10);
			xPrev = x;
		}
	}
	glutPostRedisplay();
}

void myKeyboard(unsigned char key, int x, int y)
{
	switch(key) {
		
		case 'v':
			view++;
			view %= 3;
			if(view == 0) {
				eyex=25;
				eyey=25;
				eyez=25;				
			}
			else if(view == 1) {
				eyex=25;
				eyey=0;
				eyez=0;				
			}
			else if(view == 2) {
				eyex=0;
				eyey=25;
				eyez=25;
			}			
			break;
		case 'm':
			shape = (shape+1)%3;
			break;
		case '4':
			shading = WIREFRAME;
			break;
		case '5': 
			shading = SHADE;
			glEnable(GL_LIGHT0);
			glDisable(GL_LIGHT1);
			glMaterialfv(GL_FRONT, GL_AMBIENT, ambient);
			glMaterialfv(GL_FRONT, GL_DIFFUSE, diffuse);
			break;
		case 's':
			shading = SHADE;
			glEnable(GL_LIGHT1);
			glDisable(GL_LIGHT0);			
			glMaterialfv(GL_FRONT, GL_SPECULAR, specular);
			glMaterialfv(GL_FRONT, GL_SHININESS, shininess);
			break;
		case 'f':
			//zoomCamera(0.1);
			shapeSize += 0.2;
			break;
		case 'F':
			shapeSize -= 0.2;
			break;
		default:
			break;
	}	

	glutPostRedisplay();
	
}

//<<<<<<<<<<<<<<<<<<<<<< main >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
int main(int argc, char **argv)
{	
	// initialize GLUT class
	GlutWin *win = new GlutWin( screenHeight, screenWidth,
						100, 100,
						GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH,
						"Adrian's Modeling Program" );

	myInit();

	glutDisplayFunc(display);	
	glutKeyboardFunc(myKeyboard);
	glutMouseFunc(myMouse);
	glutMotionFunc(myMouseDrag);
	createGLUTMenus();
	setCamera(eye, look, up);

	glutMainLoop();

	delete win;
	
	return( 0 );
}

