<?php

namespace TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\BrowserKit\Request;

class PokerController extends Controller
{
    public function indexAction()
    {
        return $this->render('TestBundle:poker:index.html.twig');
    }

    public function getTokenAction()
    {
        return $this->render('TestBundle:poker:index.html.twig');
    }


    /**
     * @param Request $request
     */
    public function checkWinnerAction(Request $request)
    {
        var_dump($request->getContent()); die;
    }

    /**
     * @param Request $request
     */
    public function isRoyalFlush(Request $request)
    {
        var_dump($request->getContent()); die;
    }
}
