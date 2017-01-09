<?php

namespace TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TestBundle\Lib\Card;
use TestBundle\Lib\Move;
use Symfony\Component\HttpFoundation\JsonResponse;

class PokerController extends Controller
{
    public function indexAction()
    {
        return $this->render('TestBundle:poker:index.html.twig');
    }

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getTokenAction()
    {
        return $this->render('TestBundle:poker:index.html.twig');
    }


    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function checkWinnerAction(Request $request)
    {
        $info  = $request->getContent();
        $data  = json_decode($info,true);
        $cards = array();

        for($i=0;$i<count($data);$i++)
            $cards[] = new Card($data[$i]['number'], $data[$i]['suit']);

        $move = new Move();

        switch (true){
            case $this->isRoyalFlush($cards)['match']:
                $move->setName('Royal flush');
                break;
            case $this->isStraightFlush($cards):
                $move->setName('Straight flush');
                $move->setData($this->isStraightFlush($cards)['data']);
                break;
            case $this->isFourOfKind($cards)['match']:
                $move->setName('Four of a kind');
                $move->setData($this->isFourOfKind($cards)['data']);
                break;
            case $this->isFullHouse($cards)['match']:
                $move->setName('Full house');
                $move->setData($this->isFullHouse($cards)['data']);
                break;
            case $this->isFlush($cards)['match']:
                $move->setName('Flush');
                $move->setData($this->isFlush($cards)['data']);
                break;
            case $this->isStraight($cards)['match']:
                $move->setName('Straight');
                $move->setData($this->isStraight($cards)['data']);
                break;
            case $this->isThree($cards)['match']:
                $move->setName('Three');
                $move->setData($this->isThree($cards)['data']);
                break;
            case $this->isTwoPairs($cards)['match']:
                $move->setName('Two pairs');
                $move->setData($this->isTwoPairs($cards)['data']);
                break;
            case $this->isPair($cards)['match']:
                $move->setName('Pair');
                $move->setData($this->isPair($cards)['data']);
                break;
            case $this->isHighCard($cards)['match']:
                $move->setName('High card');
                $move->setData($this->isHighCard($cards)['data']);
                break;
        }

        return new jsonResponse(array(
            'status' => 200,
            'data'   => $move->toArray()
        ));

    }


    /**
     * @param array $cards
     * @return bool
     */
    public function isRoyalFlush(array $cards)
    {
        $contNumber = 0;
        $contSuit   = 0;
        $suit       = null;

        for($i=0;$i<count($cards);$i++) {
            if($cards[$i]->getNumber() == 'A')
                $contNumber ++;
            if($cards[$i]->getNumber() == 'K')
                $contNumber ++;
            if($cards[$i]->getNumber() == 'Q')
                $contNumber ++;
            if ($cards[$i]->getNumber() == 'J')
                $contNumber ++;
            if ($cards[$i]->getNumber() == '10')
                $contNumber ++;

            if ($i == 0)
                $suit = $cards[$i]->getSuit();
            else {
                if ($suit == $cards[$i]->getSuit())
                    $contSuit++;
            }
        }

        if(($contNumber + $contSuit) == 9 )
            return array(
                'match' => true,
            );
        else
            return array(
                'match' => false,
            );
    }


    /**
     * @param array $cards
     * @return bool
     */
    private function isStraightFlush(array $cards)
    {
        $numbersValue = array();
        $suit         = null;
        $contSuit     = 0;
        $arrayOrder   = array();

        for($i=0;$i<count($cards);$i++) {
            $numbersValue[] = $cards[$i]->getReferenceValue();

            if ($i == 0)
                $suit = $cards[$i]->getSuit();
            else {
                if ($suit == $cards[$i]->getSuit())
                    $contSuit ++;
            }
        }

        if($contSuit != 4)
            return false;

        asort($numbersValue);

        foreach($numbersValue as $value) {
            $arrayOrder[] = $value;
        }
        $valMax = max($numbersValue);

        $prev = null;
        for($i=0;$i<count($arrayOrder);$i++) {
            if($i == 0) {
                $prev = $arrayOrder[$i];
                continue;
            }
            if ($prev == $arrayOrder[$i] - 1)
                $prev = $arrayOrder[$i];
            else
                return array(
                    'match' => false
                );
        }

        return array(
            'match' => true,
            'data'  => array(
                'valMax' => $valMax
            )
        );

    }


    /**
     * @param $cards
     * @return array
     */
    private function isFourOfKind($cards)
    {
        $numbers   = array();
        $theCard   = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );
        $kicker    = '';

        for($i=0;$i<count($cards);$i++) {
            $numbers[] = $cards[$i]->getNumber();
        }

        for($i=0;$i<count($numbers);$i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 4) {
                $theCard['number']   = $cards[$i]->getNumber();
                $theCard['suit']     = $cards[$i]->getSuit();
                $theCard['refValue'] = $cards[$i]->getReferenceValue();
            }
            else
                $kicker = $cards[$i]->getNumber();
        }

        if($theCard['number'] != '')
            return array(
                'match' => true,
                'data'  => array (
                    'valMax' => $theCard,
                    'kicker' => $kicker
                )
            );
        else
            return array(
                'match'  => false,
                'kicker' => $kicker
            );
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isFullHouse(array $cards)
    {
        $numbers = array();
        $three   = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => '',
        );
        $pair = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => '',
        );

        for($i=0;$i<count($cards);$i++) {
            $numbers[] = $cards[$i]->getNumber();
        }

        for($i=0;$i<count($numbers);$i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 3) {
                $three['number']   = $cards[$i]->getNumber();
                $three['suit']     = $cards[$i]->getSuit();
                $three['refValue'] = $cards[$i]->getReferenceValue();
            }
            elseif(count(array_keys($numbers, $cards[$i]->getNumber())) == 2) {
                $pair['number']   = $cards[$i]->getNumber();
                $pair['suit']     = $cards[$i]->getSuit();
                $pair['refValue'] = $cards[$i]->getReferenceValue();
            }
            else {
                return array(
                    'match' => false
                );
            }
        }

        return array(
            'match' => true,
            'data'  => array(
                'valMax' => $three,
                'secondValMax' => $pair
            )

        );

    }


    /**
     * @param array $cards
     * @return array
     */
    public function isFlush(array $cards)
    {
        $suits    = array();
        $valMax   = 0;
        $theSuit  = '';
        $refValue = array();

        for($i=0;$i<count($cards);$i++) {
            $suits[]    = $cards[$i]->getSuit();
            $refValue[] = $cards[$i]->getReferenceValue();
        }

        for($i=0;$i<count($suits);$i++) {
            if (count(array_keys($suits, $cards[$i]->getSuit())) == 5) {
                $theSuit = $cards[$i]->getSuit();
                $valMax = max($refValue);
            }
            else return array(
                'match'  => false
            );
        }

        return array (
            'match' => true,
            'data'  => array(
                'valMax' => $valMax,
                'suit'   => $theSuit
            )

        );
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isStraight(array $cards)
    {
        $numbersValue = array();
        $arrayOrder   = array();

        for($i=0;$i<count($cards);$i++) {
            $numbersValue[] = $cards[$i]->getReferenceValue();
        }

        asort($numbersValue);
        $valMax = max($numbersValue);

        foreach($numbersValue as $value) {
            $arrayOrder[] = $value;
        }

        $prev = null;
        for($i=0;$i<count($arrayOrder);$i++) {
            if($i == 0) {
                $prev = $arrayOrder[$i];
                continue;
            }

            if ($prev == $arrayOrder[$i] - 1)
                $prev = $arrayOrder[$i];
            else
                return array(
                    'match'    => false
                );
        }

        return array(
            'match' => true,
            'data'  => array(
                'valMax' => $valMax
            )

        );
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isThree(array $cards)
    {
        $numbers = array();
        $three   = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );

        for ($i = 0; $i < count($cards); $i++)
            $numbers[] = $cards[$i]->getNumber();

        for ($i = 0; $i < count($numbers); $i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 3) {
                $three['number']   = $cards[$i]->getNumber();
                $three['suit']     = $cards[$i]->getSuit();
                $three['refValue'] = $cards[$i]->getReferenceValue();
            }
        }

        if($three['number'] == '')
            return array(
                'match'=> false
            );
        return array(
            'match' => true,
            'data'  => array(
                'valMax' => $three
            )

        );
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isTwoPairs(array $cards)
    {
        $pairOne = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );
        $pairTwo = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );
        $numbers = array();

        for ($i = 0; $i < count($cards); $i++) {
            $numbers[] = $cards[$i]->getNumber();
        }

        for ($i = 0; $i < count($numbers); $i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 2 && $pairOne['number'] != $cards[$i]->getNumber()) {
                $pairOne['number']   = $cards[$i]->getNumber();
                $pairOne['suit']     = $cards[$i]->getSuit();
                $pairOne['refValue'] = $cards[$i]->getReferenceValue();
            }
        }
        for ($i = 0; $i < count($numbers); $i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 2 && $pairOne['number'] != $cards[$i]->getNumber()) {
                $pairTwo['number']   = $cards[$i]->getNumber();
                $pairTwo['suit']     = $cards[$i]->getSuit();
                $pairTwo['refValue'] = $cards[$i]->getReferenceValue();
            }
        }

        if($pairOne['number'] == ''  || $pairTwo['number'] == '')
            return array(
                'match' => false
            );

        if($pairOne['refValue'] > $pairTwo['refValue'])
            $valMax = $pairOne['refValue'];
        else $valMax = $pairTwo['refValue'];

        return array(
            'match'  => true,
            'data'   => array(
                'valMax' => $valMax,
                'pairOne' => $pairOne,
                'pairTwo' => $pairTwo
            ));
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isPair(array $cards)
    {
        $pair = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );
        $numbers = array();
        $remainingCards = array();

        for ($i = 0; $i < count($cards); $i++) {
            $numbers[] = $cards[$i]->getNumber();
        }

        for ($i = 0; $i < count($numbers); $i++) {
            if (count(array_keys($numbers, $cards[$i]->getNumber())) == 2) {
                $pair['number']   = $cards[$i]->getNumber();
                $pair['suit']     = $cards[$i]->getSuit();
                $pair['refValue'] = $cards[$i]->getReferenceValue();
            } else
                $remainingCards[] = $cards[$i]->getReferenceValue();
        }

        if($pair['number'] == '')
            return array(
                'match' => false
            );

        $valMax = max($remainingCards);
        return array(
            'match'  => true,
            'data'   => array(
                'valMax'    => $valMax,
                'cardsPair' => $pair
            ));
    }


    /**
     * @param array $cards
     * @return array
     */
    public function isHighCard(array $cards)
    {
        $refValues = array();
        $maxValue  = array(
            'number'   => '',
            'suit'     => '',
            'refValue' => ''
        );

        for ($i = 0; $i < count($cards); $i++) {
            $refValues[] = $cards[$i]->getReferenceValue();
        }

        $maxValueTmp = max($refValues);

        for ($i = 0; $i < count($cards); $i++) {
            if($cards[$i]->getReferenceValue() === $maxValueTmp) {
                $maxValue['number']   = $cards[$i]->getNumber();
                $maxValue['suit']     = $cards[$i]->getSuit();
                $maxValue['refValue'] = $cards[$i]->getReferenceValue();

                rsort($refValues);
                return array(
                    'match'  => true,
                    'data'   => array(
                        'valMax'    => $maxValue,
                        'refValues' => $refValues
                    )
                );
            }
        }
        return false;

    }



}

